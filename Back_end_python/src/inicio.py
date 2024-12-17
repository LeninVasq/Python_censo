from flask import Flask, jsonify, request
from flask_cors import CORS
from app import get_data_poblacion

app = Flask(__name__)
CORS(app)
@app.route("/api/poblacion", methods=['GET'])
def get_poblacion():
    data = get_data_poblacion()
    
    return jsonify({
        "data": data,
        
        
    })




if __name__=='__main__':
    app.run(debug=True)