#include <Windows.h>

void main() {
	HWND hWndConsole = GetConsoleWindow();
	ShowWindow(hWndConsole, SW_HIDE);
	system("python D:\\GitHub\\PersonalPage\\manage.py runserver 0.0.0.0:8000");
}