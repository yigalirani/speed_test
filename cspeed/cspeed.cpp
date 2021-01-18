// cspeed.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
#include <chrono>
#include <iostream>
int size= 10000;
int iter = 10000;
typedef int (*Func)(int a);

int f1(int val){
    return val + 1;
}
int f2(int val) {
    return val + 10;
}
Func *make_func_array(){
    Func* ar = new Func[size * 2];
    for (int i = 0; i < size; i++) {
        ar[i * 2] = f1;
        ar[i * 2 + 1] = f2;
    }
    //return ans
    return ar;
}
int run_ar(Func* ar, int start) {
    int ans = start;
    for (int i = 0; i < size*2; i++) {
        ans = ar[i](ans);
    }
    return ans;
}
int run_many(Func* ar,int start) {
    int ans = start;
    for (int i = 0; i < iter; i++)
        ans = run_ar(ar, ans);
    return ans;
}
double time() {
    using namespace std::chrono;
    double ans= (double)duration_cast<milliseconds>(system_clock::now().time_since_epoch()).count();
    return ans / 1000;
}

void run_it() {
    Func* ar = make_func_array();
    double start = time();
    int ans = run_many(ar, 5);
    double elapsed = time() - start;
    int oper = iter * size * 2;
    std::cout << "oper=" << oper << std::endl;
    std::cout<<"ans="<< ans<< std::endl;
    std::cout<<"elapsed=" << elapsed<<std::endl;
    std::cout << "megpersec=" << oper /elapsed/1000000;
}
int main()
{
    run_it();
}
// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
