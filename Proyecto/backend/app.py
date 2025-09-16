from flask import Flask, jsonify
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


if __name__ == '__main__':
    app.run(threaded=True, port=3000, debug=True)