from flask import Flask, jsonify, request
from flask_cors import CORS
from discapacidades import get_data_discapacidades
from discapacidades1 import get_data_discapacidades1
from poblacion import get_data_poblacion
from idiomas import get_data_idiomas
from esctructuras import get_data_estructuras
from etnia import get_data_etnia
app = Flask(__name__)
CORS(app)

@app.route("/api/etnia", methods=['GET'])
def get_etnia():
    data = get_data_etnia()
    
    return jsonify({
        "data": data,
        
        
})


@app.route("/api/esctructuras", methods=['GET'])
def get_esctructuras():
    data = get_data_estructuras()
    
    return jsonify({
        "data": data,
        
        
})

@app.route("/api/discapacidades", methods=['GET'])
def get_discapacidades():
    data = get_data_discapacidades()
    
    return jsonify({
        "data": data,
        
        
})
    
@app.route("/api/discapacidades1", methods=['GET'])
def get_discapacidades1():
    data = get_data_discapacidades1()
    
    return jsonify({
        "data": data,
        
        
})    
    

@app.route("/api/poblacion", methods=['GET'])
def get_poblacion():
    data = get_data_poblacion()
    
    return jsonify({
        "data": data,
        
        
})


@app.route("/api/idiomas", methods=['GET'])
def get_idiomas():
    data = get_data_idiomas()
    
    return jsonify({
        "data": data,
        
        
})



if __name__=='__main__':
    app.run(debug=True)