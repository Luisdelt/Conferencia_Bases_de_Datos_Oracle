from flask import Flask, jsonify,request
from flask_cors import CORS
from config_cloud import get_oracle_connection
app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return jsonify({"message": "Sean bienvenidos a la parte del backend de la conferencia"})

@app.route('/api/dual')
def dual():
    try:
        connection = get_oracle_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT 'Hola desde Oracle Cloud!' AS saludo FROM dual")
        result = cursor.fetchone()
        cursor.close()
        connection.close()
        return jsonify({"saludo": result[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/test/grades', methods=['GET'])
def get_students_grades():
    try:
        connection = get_oracle_connection()
        cursor = connection.cursor()
        query = """
        SELECT
            r.id_registro,
            r.nombre_completo,
            r.genero,
            r.tipo_licencia,
            r.tipo_tramite,
            e.id_examen,
            rt.resultado_teorico,
            rp.resultado_practico,
            CASE
                WHEN rt.resultado_teorico >= 70 AND rp.resultado_practico >= 70 THEN 'Aprobado'
                ELSE 'Reprobado'
            END AS resultado
        FROM registro r
        JOIN examen e ON r.id_registro = e.id_registro
        JOIN (
            SELECT ru.id_examen, SUM(CASE WHEN ru.respuesta = p.respuesta THEN 4 ELSE 0 END) AS resultado_teorico
            FROM respuesta_usuario ru
            JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
            GROUP BY ru.id_examen
        ) rt ON e.id_examen = rt.id_examen
        JOIN (
            SELECT rpu.id_examen, SUM(rpu.nota) AS resultado_practico
            FROM respuesta_practico_usuario rpu
            GROUP BY rpu.id_examen
        ) rp ON e.id_examen = rp.id_examen
        WHERE TRUNC(r.fecha) = TO_DATE('13-03-23', 'DD-MM-YY')
        ORDER BY e.id_examen"""
        cursor.execute(query)
        grades = [
            {
                "id_registro": row[0],
                "nombre_completo": row[1],
                "genero": row[2],
                "tipo_licencia": row[3],
                "tipo_tramite": row[4],
                "id_examen": row[5],
                "resultado_teorico": row[6],
                "resultado_practico": row[7],
                "resultado": row[8]
            }
            for row in cursor.fetchall()
        ]
        cursor.close()
        connection.close()
        return jsonify(grades)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/test/aproved', methods=['GET'])
def get_aproved_grades():
    try:
        connection = get_oracle_connection()
        cursor = connection.cursor()
        query = """
        SELECT
            r.fecha,
            r.id_registro,
            r.nombre_completo,
            r.genero,
            r.tipo_licencia,
            r.tipo_tramite,
            e.id_examen,
            rt.resultado_teorico,
            rp.resultado_practico,
            CASE
                WHEN rt.resultado_teorico >= 70 AND rp.resultado_practico >= 70 THEN 'Aprobado'
                ELSE 'Reprobado'
            END AS resultado
        FROM registro r
        JOIN examen e ON r.id_registro = e.id_registro
        JOIN (
            SELECT ru.id_examen, SUM(CASE WHEN ru.respuesta = p.respuesta THEN 4 ELSE 0 END) AS resultado_teorico
            FROM respuesta_usuario ru
            JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
            GROUP BY ru.id_examen
        ) rt ON e.id_examen = rt.id_examen
        JOIN (
            SELECT rpu.id_examen, SUM(rpu.nota) AS resultado_practico
            FROM respuesta_practico_usuario rpu
            GROUP BY rpu.id_examen
        ) rp ON e.id_examen = rp.id_examen
        WHERE TRUNC(r.fecha) BETWEEN TO_DATE('12-03-23', 'DD-MM-YY')
        AND TO_DATE('13-03-23', 'DD-MM-YY')
        AND rt.resultado_teorico >= 70
        AND rp.resultado_practico >= 70
        ORDER BY e.id_examen"""
        cursor.execute(query)
        aproved = [
            {
                "fecha": row[0],
                "id_registro": row[1],
                "nombre_completo": row[2],
                "genero": row[3],
                "tipo_licencia": row[4],
                "tipo_tramite": row[5],
                "id_examen": row[6],
                "resultado_teorico": row[7],
                "resultado_practico": row[8],
                "resultado": row[9]
            }
            for row in cursor.fetchall()
        ]
        cursor.close()
        connection.close()
        return jsonify(aproved)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/test/count', methods=['GET'])
def get_count_evaluations():
    try:
        connection = get_oracle_connection()
        cursor = connection.cursor()
        query = """
        SELECT
            r.tipo_tramite,
            r.tipo_licencia,
            COUNT(*) AS numero_evaluaciones
        FROM registro r
        WHERE TRUNC(r.fecha) BETWEEN TO_DATE('01-03-23', 'DD-MM-YY')  AND TO_DATE('13-03-23', 'DD-MM-YY')
        GROUP BY r.tipo_tramite, r.tipo_licencia
        ORDER BY r.tipo_tramite, r.tipo_licencia"""
        cursor.execute(query)
        counts = [
            {
                "tipo_tramite": row[0],
                "tipo_licencia": row[1],
                "numero_evaluaciones": row[2]
            }
            for row in cursor.fetchall()
        ]
        cursor.close()
        connection.close()
        return jsonify(counts)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/test/questions', methods=['GET'])
def get_most_correct_questions():
    try:
        connection = get_oracle_connection()
        cursor = connection.cursor()
        query = """
        SELECT
            p.id_pregunta,
            p.texto,
            SUM(CASE WHEN ru.respuesta = p.respuesta THEN 1 ELSE 0 END) AS aciertos
        FROM
            registro r
        JOIN examen e ON r.id_registro = e.id_registro
        JOIN respuesta_usuario ru ON e.id_examen = ru.id_examen
        JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
        WHERE TRUNC(r.fecha) BETWEEN TO_DATE ('12-03-23', 'DD-MM-YY')
            AND TO_DATE('13-03-23', 'DD-MM-YY')
        GROUP BY p.id_pregunta, p.texto
        ORDER BY aciertos DESC"""
        cursor.execute(query)
        questions = [
            {
                "id_pregunta": row[0],
                "texto": row[1],
                "aciertos": row[2]
            }
            for row in cursor.fetchall()
        ]
        cursor.close()
        connection.close()
        return jsonify(questions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/department/insert', methods=['POST'])
def insert_department():
    try:
        data = request.get_json()
        id_departamento = data["id_departamento"]
        nombre = data["nombre"]
        codigo = data["codigo"]

        connection = get_oracle_connection()
        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO DEPARTAMENTO 
                (ID_DEPARTAMENTO, NOMBRE, CODIGO) 
            VALUES (:id_departamento, :nombre, :codigo)
        """, {"id_departamento":id_departamento, "nombre":nombre, "codigo":codigo})
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({
            "status": "success",
            "message": "Department inserted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/school/<int:id_escuela>', methods=['PUT'])
def update_school(id_escuela):
    try:
        connection = get_oracle_connection()
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM ESCUELA WHERE ID_ESCUELA = :id_escuela", {"id_escuela": id_escuela}
        )
        fila = cursor.fetchone()
        if fila:
            data = request.get_json()
            if not data:
                return jsonify({"error": "No input data provided"}), 400
            campos = []
            valores = {}
            for key, value in data.items():
                campos.append(f"{key.upper()} = :{key}")
                valores[key] = value
            if not campos:
                return jsonify({"error": "No fields to update"}), 400
            valores["id_escuela"] = id_escuela
            query = f"""
                UPDATE ESCUELA 
                SET {', '.join(campos)} 
                WHERE ID_ESCUELA = :id_escuela
            """
            print(query)
            print(valores)
            connection = get_oracle_connection()
            cursor = connection.cursor()
            cursor.execute(query, valores)
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({
                "status": "success",
                "message": "School updated successfully"})
        else:
            cursor.close()
            connection.close()
            return jsonify({"error": "School not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(threaded=True, port=3000, debug=True)