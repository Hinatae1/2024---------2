let ar = [23, 45, 567, 452, 34 , 42, 76, 21];

//배열 ar에서 원소를 하나씩 꺼내서 홀수, 짝수 판별 결과에 따라 해당 배열에 넣는다.
let odd = [];   //홀수 저장용 배열
let even = [];       //짝수 저장용 배열

//for of 반복문 사용하기

for(let item of ar){
    if(item%2 == 0) //짝수이면
        even.push(item);    //배열 even에 저장한다
    
    else
    odd.push();
}

//최종 결과 배열 2개, odd, even을 출력하기
console.log(even);
console.log(odd);






