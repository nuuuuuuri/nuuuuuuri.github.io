document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navigationBar = document.getElementById('navigation-bar');
    
    // 햄버거 메뉴 클릭 시 네비게이션 바 표시/숨기기
    menuIcon.addEventListener('click', () => {
        navigationBar.classList.toggle('active');
    });
    
    // 네비게이션 바의 링크 클릭 시 메뉴 닫히기
    const navLinks = navigationBar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigationBar.classList.remove('active');
        });
    });
	
	// 모든 섹션과 메뉴 항목을 가져옵니다.
    const sections = document.querySelectorAll('main section');
    const menuItems = navigationBar.querySelectorAll('a');
    
    // 각 메뉴 클릭 시 해당 섹션만 표시
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // 링크의 기본 동작 방지

            // 모든 섹션 숨기기
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // 클릭한 메뉴에 해당하는 섹션만 표시
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
        });
    });
	
	// intro 버튼을 클릭했을 때 해당 섹션을 보여주는 이벤트 추가
    const introButtons = document.querySelectorAll('.intro-btn');
    introButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // 기본 동작 방지

            // 해당하는 네비게이션 링크를 클릭한 것처럼 동작하게 하기
            const targetId = button.getAttribute('href').substring(1); // 버튼의 href에서 id 추출
            const targetLink = document.querySelector(`a[href="#${targetId}"]`); // 해당 id의 링크 찾기

            if (targetLink) {
                // 링크의 클릭 이벤트 강제로 발생
                targetLink.click();
            }
        });
    });
	
	const goBackButtonMap = document.querySelectorAll('.go-back-btn');
    
    goBackButtonMap.forEach(button => {
         button.addEventListener('click', () => {
            // "뒤로 가기" 버튼 클릭 시 main-intro로 이동
            const mainIntroSection = document.getElementById('main-intro');
            
			 // 모든 섹션 숨기기
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // 클릭한 메뉴에 해당하는 섹션만 표시
            mainIntroSection.classList.add('active');			
          
        });
    });
	
	// 체크박스를 클릭할 때마다 상태를 저장
	document.querySelectorAll('#checklist input[type="checkbox"]').forEach(checkbox => {
		checkbox.addEventListener('change', saveChecklistState);
	});

	// 페이지 로드 시 체크박스 상태 복원
	loadChecklistState();


	
});

// 페이지의 맨 위로 스크롤하는 함수
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scroll-to-top');

    // 스크롤이 일정 위치 이상일 때 버튼 표시
    if (window.scrollY > 300) { // 300px 이상 스크롤 시
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
});
const VND_TO_KRW_RATE = 5.50 / 100; // 100 VND = 5.50 KRW, 1 VND = 0.055 KRW
const KRW_TO_VND_RATE = 100 / 5.50; // 5.50 KRW = 100 VND, 1 KRW = 18.18 VND

function convertToVND() {
    const krwAmount = parseFloat(document.getElementById('krw').value.replace(/,/g, '')); // 쉼표 제거 후 숫자 변환
    const vndAmount = krwAmount * KRW_TO_VND_RATE;

    // VND 입력값과 출력값을 천 단위 구분
    document.getElementById('vnd').value = vndAmount.toFixed(0).toLocaleString(); // 베트남 동화 값에 쉼표 추가
    document.getElementById('vnd-output').textContent = `${comma(krwAmount)} 원 = ${comma(vndAmount.toFixed(0).toLocaleString())} VND`;
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function convertToKRW() {
    const vndAmount = parseFloat(document.getElementById('vnd').value.replace(/,/g, '')); // 쉼표 제거 후 숫자 변환
    const krwAmount = vndAmount * VND_TO_KRW_RATE;

    // KRW 입력값과 출력값을 천 단위 구분
    document.getElementById('krw').value = krwAmount.toFixed(0).toLocaleString(); // 원화 값에 쉼표 추가
    document.getElementById('krw-output').textContent = `${comma(vndAmount)} VND = ${comma(krwAmount.toFixed(0).toLocaleString())} 원`;
}



const USD_TO_KRW_RATE = 1300; // 1 USD = 1300 KRW (예시 환율, 실제 환율에 따라 다를 수 있음)
const KRW_TO_USD_RATE = 1 / USD_TO_KRW_RATE; // 1 KRW = 1 / 1300 USD

// USD -> KRW 변환 함수
function convertDollarToKRW() {
	const usdAmount = parseFloat(document.getElementById('usd').value.replace(/,/g, '')); // 쉼표 제거 후 숫자 변환
	if (isNaN(usdAmount)) return; // 유효한 숫자가 아닌 경우 변환 안함

	const krwAmount = usdAmount * USD_TO_KRW_RATE;
	document.getElementById('krw').value = comma(krwAmount); // KRW에 천 단위 구분 적용
	document.getElementById('krw-output').textContent = `${comma(usdAmount)} USD = ${comma(krwAmount.toFixed(0).toLocaleString())} KRW`;
}

// KRW -> USD 변환 함수
function convertKRWToDollar() {
	const krwAmount = parseFloat(document.getElementById('krw').value.replace(/,/g, '')); // 쉼표 제거 후 숫자 변환
	if (isNaN(krwAmount)) return; // 유효한 숫자가 아닌 경우 변환 안함

	const usdAmount = krwAmount * KRW_TO_USD_RATE;
	document.getElementById('usd').value = comma(usdAmount); // USD에 천 단위 구분 적용
	document.getElementById('usd-output').textContent = `${comma(krwAmount)} KRW = ${comma(usdAmount.toFixed(0).toLocaleString()) } USD`;
}


// 체크박스를 클릭할 때마다 쿠키에 상태 저장
function saveChecklistState() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const checklistState = {};

    checkboxes.forEach((checkbox, index) => {
        checklistState[`item${index}`] = checkbox.checked; // 체크된 상태 저장
    });

    // 상태를 JSON 문자열로 변환하여 쿠키에 저장 (1일 동안 유지)
    document.cookie = `checklistState=${JSON.stringify(checklistState)}; path=/; max-age=${60 * 60 * 24}`;
}

// 페이지 로드 시 쿠키에서 체크박스 상태 복원
function loadChecklistState() {
    const cookies = document.cookie.split(';');
    let checklistState = {};

    cookies.forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        if (key === 'checklistState') {
            checklistState = JSON.parse(decodeURIComponent(value)); // 쿠키에서 JSON 상태 읽기
        }
    });

    // 체크박스를 해당 상태로 설정
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        if (checklistState[`item${index}`]) {
            checkbox.checked = true; // 체크박스를 체크 상태로 설정
        } else {
            checkbox.checked = false; // 체크박스를 체크 해제 상태로 설정
        }
    });
}

