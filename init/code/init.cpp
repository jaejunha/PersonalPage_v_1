#include <Windows.h>

void main() {
	HWND hWndConsole = GetConsoleWindow();
	ShowWindow(hWndConsole, SW_HIDE);
	system("start D:\\GitHub\\PersonalPage\\init\\server.exe");
	Sleep(5000);
	system("start /B D:\\GitHub\\PersonalPage\\init\\browser");
}