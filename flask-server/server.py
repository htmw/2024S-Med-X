#Resources:
#https://www.youtube.com/watch?v=7LNl2JlZKHA (tutorial to set up simple API in React using Flask)
#https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/ (Tutorial to install Python environment in Windows)
#https://www.geeksforgeeks.org/how-to-install-flask-in-windows/ (tutorial to install Flask in Windows)
#Before running React app, test API at localhost:5000/members. 
#How to run this server:
# run "cd .ven\" AND "Scripts\activate" (Windows) or "source ven/bin/activate" (Mac)
# run "pip install flask" (Windows) or "pip3 install flask" (Mac)
# run "python server.py" (Windows) or "python3 server.py" (Mac)
#
#to stop server, run "deactivate"
from flask import Flask

app = Flask(__name__)

#Members API Route
@app.route("/members")

def members():
    return {"members": ["Member1", "Member2", "Member3"]} #dictionary (key-value pair) with array as value

if __name__ == "__main__":
    app.run(debug=True)

