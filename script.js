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
