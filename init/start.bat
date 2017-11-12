D:
cd D:\\GitHub\\PersonalPage 
start python manage.py runserver 0.0.0.0:8000
timeout /t 5
start /B D:\\GitHub\\PersonalPage\\init\\browser
start python update.py
exit