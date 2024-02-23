from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)


@app.route('/process_orders', methods=['POST'])
def process_orders():
    data = request.json
    packages_input = '\n'.join(data['packages']) + '\n' + 'done'
    process = subprocess.Popen(['python', 'order_counter.py'],
                               stdin=subprocess.PIPE,
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE,
                               text=True)
    stdout, stderr = process.communicate(input=packages_input)

    if process.returncode == 0:
        total_orders_index = stdout.find("Total Orders:")
        if total_orders_index != -1:
            order_summary = stdout[total_orders_index:]
            return jsonify({'success': True, 'output': order_summary.split('\n')[1:-1]}), 200
        else:
            return jsonify({'success': False, 'error': 'Total Orders not found'}), 500
    else:
        return jsonify({'success': False, 'error': stderr}), 500


if __name__ == '__main__':
    app.run(debug=True)
