import sys
import json
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve
from contextlib import redirect_stdout
from order_counter import main as order_counter

app = Flask(__name__)
CORS(app)


def parse_output_data(output):
    total_orders_index = output.find("Total Orders:")
    if total_orders_index == -1:
        return jsonify({'success': False, 'error': 'Total Orders not found'}), 500

    order_string = output[total_orders_index:]
    order_string_array = order_string.split('\n')[1:-1]
    order_data = {}
    for order_item_string in order_string_array:
        last_key_index = order_item_string.find(" .")
        first_value_index = order_item_string.find(". ") + 2
        key = order_item_string[2:last_key_index]
        value = int(order_item_string[(first_value_index):])
        order_data[key] = value

    return jsonify({'success': True, 'output': order_data}), 200


@app.route('/process_orders', methods=['POST'])
def process_orders():
    try:
        data = request.json
        packages_input = '\n'.join(data['packages']) + '\n' + 'done'
        input_stream = io.StringIO(packages_input)
        output_stream = io.StringIO()
        with redirect_stdout(output_stream):
            sys.stdin = input_stream
            order_counter()
            sys.stdin = sys.__stdin__
        return parse_output_data(output_stream.getvalue())
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    port = 4949
    with open("port_info.json", "w") as f:
        json.dump({"port": port}, f)
    print(port)
    serve(app, host='0.0.0.0', port=port)


# DYNAMIC PORT ASSIGNMENT FUNCTION
# def find_free_port():
#     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#         s.bind(('localhost', 0))
#         return s.getsockname()[1]

# DEBUGGING ROUTES
# @app.route('/', methods=['GET'])
# def home():
#     try:
#         result = io.StringIO()
#         with redirect_stdout(result):
#             hello_world()
#         return result.getvalue(), 200
#     except Exception as e:
#         error_message = f"An error occurred: {str(e)}"
#         return error_message, 500


# @app.route('/no_python_exec_home', methods=['GET'])
# def no_python_exec():
#     return "Hello World"
