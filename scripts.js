const menuItems = document.querySelectorAll('.menu-item');
const cartItems = document.querySelector('.cart-items');
const totalPriceElement = document.getElementById('total-price');
let total = 0;

// 카테고리 버튼 클릭 이벤트 추가
const categoryButtons = document.querySelectorAll('.category');
categoryButtons.forEach(button => {
    button.addEventListener('click', filterMenu);
});

// 메뉴 아이템 드래그 앤 드롭 이벤트
menuItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// 장바구니 영역에 드롭 이벤트
cartItems.addEventListener('dragover', dragOver);
cartItems.addEventListener('drop', drop);

// 장바구니 항목 드래그 앤 드롭 이벤트 추가
cartItems.addEventListener('dragover', dragOver);
cartItems.querySelectorAll('.cart-item').forEach(item => {
    item.addEventListener('dragstart', dragStartCart);
});

// 필터 메뉴 함수
function filterMenu(e) {
    const selectedCategory = e.target.dataset.category;

    menuItems.forEach(item => {
        item.style.display = 'none';
        if (item.dataset.category === selectedCategory || selectedCategory === 'All') {
            item.style.display = 'block';
        }
    });

    // 장바구니에 있는 아이템도 해당 카테고리로 보여주기
    const cartItemsArray = document.querySelectorAll('.cart-item');
    cartItemsArray.forEach(cartItem => {
        const itemName = cartItem.querySelector('p').innerText;
        const menuItem = Array.from(menuItems).find(item => item.querySelector('p').innerText === itemName);
        if (menuItem && menuItem.dataset.category === selectedCategory) {
            menuItem.style.display = 'none'; // 장바구니에 있는 아이템은 메뉴에서 숨김
        }
    });
}

// 메뉴 드래그 시작
function dragStart(e) {
    e.dataTransfer.setData('text/plain', JSON.stringify({
        name: this.querySelector('p').innerText,
        price: this.dataset.price,
        quantity: 1
    }));
}

// 장바구니 드래그 시작
function dragStartCart(e) {
    const itemName = this.querySelector('p').innerText;
    const itemPrice = this.querySelector('.subtotal').innerText;
    const itemQuantity = this.querySelector('input').value;

    e.dataTransfer.setData('text/plain', JSON.stringify({
        name: itemName,
        price: itemPrice.replace(/[^0-9]/g, ''), // 가격에서 숫자만 추출
        quantity: itemQuantity
    }));
}

function dragEnd() {
    // 드래그 종료 시의 작업
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const itemData = JSON.parse(e.dataTransfer.getData('text/plain'));
    addToCart(itemData);
}

// 장바구니에 아이템 추가
function addToCart(itemData) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const itemName = document.createElement('p');
    itemName.innerText = itemData.name;

    const itemPrice = document.createElement('p');
    itemPrice.innerText = `가격: ₩${itemData.price}`;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = itemData.quantity;
    quantityInput.min = 1;

    // 수량 변경 시 소계 및 총합 업데이트
    quantityInput.addEventListener('input', (e) => {
        itemData.quantity = e.target.value;
        updateSubtotal(cartItem, itemData);
        updateTotal(); // 총합 업데이트
    });

    const subtotal = document.createElement('p');
    subtotal.classList.add('subtotal');
    subtotal.innerText = `소계: ₩${itemData.price * itemData.quantity}`; // 초기 소계 설정

    const removeButton = document.createElement('button');
    removeButton.innerText = '제거';
    removeButton.addEventListener('click', () => {
        cartItems.removeChild(cartItem);
        updateTotal(-itemData.price * itemData.quantity);
        addToMenu(itemData.name); // 메뉴에 다시 추가
    });

    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(quantityInput);
    cartItem.appendChild(subtotal);
    cartItem.appendChild(removeButton);
    
    cartItems.appendChild(cartItem);
    updateTotal(itemData.price * itemData.quantity); // 추가된 아이템의 가격을 총합에 반영합니다.

    // 메뉴에서 아이템 제거
    const menuItem = Array.from(menuItems).find(item => item.querySelector('p').innerText === itemData.name);
    if (menuItem) {
        menuItem.style.display = 'none'; // 메뉴에서 해당 아이템 숨기기
    }
}

// 메뉴에 아이템 추가
function addToMenu(itemName) {
    const menuItem = Array.from(menuItems).find(item => item.querySelector('p').innerText === itemName);
    if (menuItem) {
        menuItem.style.display = 'block'; // 메뉴에서 해당 아이템 보이기
    }
}

// 소계 업데이트
function updateSubtotal(cartItem, itemData) {
    const subtotalElement = cartItem.querySelector('.subtotal');
    if (subtotalElement) { // subtotalElement가 존재하는지 확인
        const subtotal = itemData.price * itemData.quantity;
        subtotalElement.innerText = `소계: ₩${subtotal}`;
    }
}

// 총 합계 업데이트
function updateTotal(amount = 0) {
    // 총합을 재계산
    total = 0;
    const cartItemsArray = document.querySelectorAll('.cart-item');
    cartItemsArray.forEach(item => {
        const subtotalText = item.querySelector('.subtotal').innerText;
        const subtotal = parseInt(subtotalText.replace(/[^0-9]/g, ''), 10); // 소계에서 가격만 추출
        total += subtotal; // 총합에 소계 추가
    });

    totalPriceElement.innerText = `₩${total}`;
}

// 결제 버튼 클릭 이벤트
document.getElementById('checkout-button').addEventListener('click', function() {
    const cartItemsArray = document.querySelectorAll('.cart-item');
    let totalAmount = 0;
    let receiptContent = '영수증:\n\n'; // 영수증 내용 초기화

    cartItemsArray.forEach(item => {
        const itemName = item.querySelector('p').innerText;
        const itemPrice = item.querySelector('.subtotal').innerText;
        const quantity = item.querySelector('input').value;
        const priceValue = parseInt(itemPrice.replace(/[^0-9]/g, ''), 10);
        totalAmount += priceValue;

        receiptContent += `${itemName} x ${quantity}: ₩${priceValue}\n`; // 영수증 내용 추가
    });

    receiptContent += `\n총액: ₩${totalAmount}`; // 총액 추가

    // 영수증 표시
    window.alert(receiptContent);

    // 장바구니 초기화
    cartItems.innerHTML = '';
    updateTotal(); // 총합 초기화

    // 메뉴 초기화 (모든 메뉴 항목 보이기)
    menuItems.forEach(item => {
        item.style.display = 'block'; // 모든 메뉴 항목 보이기
    });
});
