import oracledb
import os


def get_oracle_connection():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    wallet_path = os.path.join(base_dir, 'recursos', 'Wallet_BDConferencia')
    
    connection = oracledb.connect(
        user="CONFERENCISTAS",
        password="Contrasena123",
        dsn="bdconferencia_high",
        config_dir=wallet_path,
        wallet_location =wallet_path,
        wallet_password = "wallet123"
    )
    return connection
