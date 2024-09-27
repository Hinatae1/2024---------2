//익명함수 활용하기

let doubleX = function (n) {
    return n * 2;
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//메개변수 배열 ar의 모든 요소가 number이면 true, 아니면 false 변환하기
let isAllNumber = function(ar) {
    
    for(let item of ar){
        if(typeof(item) != 'number')
            return false;
    }
    return true;
}

let sumArray = function (ar) {
    let sum = 0;

    if(isAllNumber(ar) == false){
        console.log("sumArray: 오류: 합계를 계산할 수 있는 배열이 아입니다.")
        return NaN;
    }

    for(let item of ar) 
        sum+= item;
    
    return sum;
}
//-----------------------------------------------------------------------------
let max = (a,b) => {
    if(a > b)
            return a;
    else
            return b;
}
//-----------------------------------------------------------------------------
let max3 = (a, b, c) => {
    if(a > b)
        if(a > c)
            return a;
        else
            return c;
    else 
        if(b > c)
            return b;
        else
            return c;
}

//-----------------------------------------------------------------------------
console.log(max3(10,50, 40));

console.log(isAllNumber([10,20,30,40,50]));

