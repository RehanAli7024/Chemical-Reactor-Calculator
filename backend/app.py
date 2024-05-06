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

    if (data["flowRateUnit"] == 'mol/min'):
        F = F * (0.0166666667)
    elif (data["flowRateUnit"] == "lb-mol/min"):
        F = F * (7.559866667)

    if (data["reactionRateUnit"] == 'mol/Lmin'):
        r = r * (0.0166666667)
    elif (data["reactionRateUnit"] == "lb-mol/Lmin"):
        r = r * (7.559866667)
    
    if(data["volumeUnit"] == 'cm3'):
        V = V * (0.001)
    elif(data["volumeUnit"] == "m3"):
        V = V * (1000)
    elif(data["volumeUnit"] == "ft3"):
        V = V * (28.316846592)

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
    return jsonify({'unknown': unknown, 'result' : round(result,8)})

@app.route('/PFR_volume', methods=['POST'])
def pfr_volume():
    data = request.json
    V = float(data['volume'])
    F = float(data['flowRate'])
    Xf = float(data['conversion'])
    r = "1/" + "(" + str(data['reactionRate']) + ")"

    RR = 1

    if (data["flowRateUnit"] == 'mol/min'):
        F = F * (0.0166666667)
    elif (data["flowRateUnit"] == "lb-mol/min"):
        F = F * (7.559866667)

    if (data["reactionRateUnit"] == 'mol/Lmin'):
        RR = RR * (0.0166666667)
    elif (data["reactionRateUnit"] == "lb-mol/Lmin"):
        RR = RR * (7.559866667)
    
    if(data["volumeUnit"] == 'cm3'):
        V = V * (0.001)
    elif(data["volumeUnit"] == "m3"):
        V = V * (1000)
    elif(data["volumeUnit"] == "ft3"):
        V = V * (28.316846592)

    x = sp.symbols('x')
    rate = sp.sympify(r)
    lower_limit = 0
    upper_limit = Xf
    result = sp.integrate(rate, (x, lower_limit, upper_limit))

    # Convert the sympy object to a float or string
    try:
        result_float = float(result)
    except (ValueError, TypeError):
        out = "undefined"
        if (V < 0):
            unknown = "volume"
        elif (F < 0):
            unknown = "flowRate"
        return jsonify({'unknown': unknown, 'result': out})

    if V < 0:
        out = F * result_float / RR
        unknown = "volume"
    elif F < 0:
        out = V * RR / result_float
        unknown = "flowRate"
    if(out >= 0):
         out = round(max(0,out),3)
    else:
        out = "not possible"
    return jsonify({'unknown': unknown, 'result': out})
@app.route('/PBR_volume', methods=['POST'])
def pbr_volume():
    data = request.json
    W = float(data['weight'])
    F = float(data['flowRate'])
    Xf = float(data['conversion'])
    r = "1/(" + str(data['reactionRate']) + ")"
    RR = 1

    if (data["flowRateUnit"] == 'mol/min'):
        F = F * (0.0166666667)
    elif (data["flowRateUnit"] == "lb-mol/min"):
        F = F * (7.559866667)

    if (data["reactionRateUnit"] == 'mol/kg-min'):
        RR = RR * (0.0166666667)
    elif (data["reactionRateUnit"] == "lb-mol/kg-min"):
        RR = RR * (7.559866667)
    
    if (data["weightUnit"] == "g"):
        W = W * (0.001)
    elif (data["weightUnit"] == "lbs"):
        W = W * (0.453592)
    
    x = sp.symbols('x')
    rate = sp.sympify(r)
    lower_limit = 0
    upper_limit = Xf
    result = sp.integrate(rate, (x, lower_limit, upper_limit))

    try:
        result_float = float(result)
    except (ValueError, TypeError):
        out = "undefined"
        if (W < 0):
            unknown = "weight"
        elif (F < 0):
            unknown = "flowRate"
        return jsonify({'unknown': unknown, 'result': out})

    if W < 0:
        out = F * result_float / RR
        unknown = "weight"
    elif F < 0:
        out = W * RR / result_float
        unknown = "flowRate"

    return jsonify({'unknown': unknown, 'result': round(max(0,out),3)})


@app.route('/batch_time', methods=['POST'])
def batch_time():
    data = request.json
    T = float(data['time'])
    V = float(data['volume'])
    N = float(data['initialMoles'])
    Xf = float(data['conversion'])
    r = "1/(" + str(data['reactionRate']) + ")"
    RR = 1
    if (data["initialMolesUnit"] == 'lb-mol'):
        N = N * (453.59)

    if (data["reactionRateUnit"] == 'mol/Lmin'):
        RR = RR * (0.0166666667)
    elif (data["reactionRateUnit"] == "lb-mol/Lmin"):
        RR = RR * (7.559866667)

    if (data["timeUnit"] == 'min'):
        T = T * (60)
    elif (data["timeUnit"] == "hr"):
        T = T * (3600) 
    
    if(data["volumeUnit"] == 'cm3'):
        V = V * (0.001)
    elif(data["volumeUnit"] == "m3"):
        V = V * (1000)
    elif(data["volumeUnit"] == "ft3"):
        V = V * (28.316846592)

    x = sp.symbols('x')
    rate = sp.sympify(r)
    lower_limit = 0
    upper_limit = Xf
    result = sp.integrate(rate, (x, lower_limit, upper_limit))

    # Convert the sympy object to a float or string
    try:
        result_float = float(result)
    except (ValueError, TypeError):
        out = "undefined"
        if (V < 0):
            unknown = "volume"
        elif (N < 0):
            unknown = "initialMoles"
        elif T < 0:
            unknown = "time"
        return jsonify({'unknown': unknown, 'result': out})

    if T < 0:
        out = N * result_float/ (RR * V)
        unknown = "time"
    elif N < 0:
        out = T * V * RR / result_float
        unknown = "initialMoles"
    elif V < 0:
        out = N * result_float / (RR * T)
        unknown = "volume"

    if(out >= 0):
         out = round(max(0,out),3)
    else:
        out = "not possible"
    return jsonify({'unknown': unknown, 'result': out})

if __name__ == '__main__':
    app.run(debug=True)


