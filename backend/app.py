from flask import Flask, request, jsonify
from flask_cors import CORS
import math
from scipy.integrate import quad
import numpy as np
import sympy as sp
app = Flask(__name__)
CORS(app)


@app.route('/CSTR_conversion', methods = ['POST'])
def cstr_conversion():
    data = request.json
    V = float(data['volume'])
    F = float(data['flowRate'])
    X = float(data['conversion'])
    r = float(data['reactionRate'])
    if V < 0:
        if(r == 0):
            result = 0
        else:
            result =  F * X / r
        unknown = 'volume'
    elif F < 0:
        if(X == 0):
            result = 0
        else:
            result =  V * r / (X)
        unknown = 'flowRate'
    elif X < 0:
        if(F == 0):
            result = 0
        else:
            result =  min((V * r)/F,1)
        unknown = 'conversion'

    else:
        if(V == 0):
            result = 0
        else:
            result =  F * (X) / V
        unknown = 'rate'
    return jsonify({'unknown': unknown, 'result' : round(result,3)})

@app.route('/PFR_volume', methods=['POST'])
def pfr_volume():
    data = request.json
    V = float(data['volume'])
    F = float(data['flowRate'])
    Xf = float(data['conversion'])
    r = "1/" + "(" + str(data['reactionRate']) + ")"

    if (data["flowRateUnit"] == 'mol/Lmin'):
        F = F * (0.0166666667)
    elif (data["flowRateUnit"] == "lb-mol/Lmin"):
        F = F * (7.559866667)

    if (data["reactionRateUnit"] == 'mol/min'):
        F = F * (0.0166666667)
    elif (data["reactionRateUnit"] == "lb-mol/min"):
        F = F * (7.559866667)

    x = sp.symbols('x')
    rate = sp.sympify(r)
    lower_limit = 0
    upper_limit = Xf
    result = sp.integrate(rate, (x, lower_limit, upper_limit))

    # Convert the sympy object to a float or string
    result_float = float(result)

    if V < 0:
        out = F * result_float
        unknown = "volume"
    elif F < 0:
        out = V / result_float
        unknown = "flowRate"

    return jsonify({'unknown': unknown, 'result': max(0,out)})

@app.route('/PBR_volume', methods=['POST'])
def pbr_volume():
    data = request.json
    W = float(data['weight'])
    F = float(data['flowRate'])
    Xf = float(data['conversion'])
    r = "1/(" + str(data['reactionRate']) + ")"

    if (data["flowRateUnit"] == 'mol/Lmin'):
        F = F * (0.0166666667)
    elif (data["flowRateUnit"] == "lb-mol/Lmin"):
        F = F * (7.559866667)

    if (data["reactionRateUnit"] == 'mol/kg-min'):
        F = F * (0.0166666667)
    elif (data["reactionRateUnit"] == "lb-mol/kg-min"):
        F = F * (7.559866667)

    x = sp.symbols('x')
    rate = sp.sympify(r)
    lower_limit = 0
    upper_limit = Xf
    result = sp.integrate(rate, (x, lower_limit, upper_limit))

    # Convert the sympy object to a float or string
    result_float = float(result)

    if W < 0:
        out = F * result_float
        unknown = "weight"
    elif F < 0:
        out = W / result_float
        unknown = "flowRate"

    return jsonify({'unknown': unknown, 'result': max(0,out)})

if __name__ == '__main__':
    app.run(debug=True)


