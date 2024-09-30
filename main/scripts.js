document.addEventListener('DOMContentLoaded', function() {
    // 현재 날짜 표시
    function showDate() {
        var today = new Date();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var dateString = month + ' / ' + day;
        var todayElement = document.querySelector('.today');
        if (todayElement) {
            todayElement.textContent = dateString;
        }
    }

    // 현재 시간 표시
    function updateTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var timeString = hours + ' : ' + minutes + ' ' + ampm;
        var timeElements = document.querySelectorAll('.time-now');
        timeElements.forEach(function(element) {
            element.textContent = timeString;
        });
    }

    // 알림창 표시
    function setupNoticePopup() {
        const noticeMenu = document.querySelector('.notice-menu');
        const noticePopup = document.querySelector('.notice-popup');

        noticeMenu.addEventListener('click', function(event) {
            event.preventDefault();
            noticePopup.classList.toggle('hidden');
            noticeMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (!noticeMenu.contains(event.target) && !noticePopup.contains(event.target)) {
                noticePopup.classList.add('hidden');
                noticeMenu.classList.remove('active');
            }
        });
    }

    // GNB 섹션 표시
    function setupGnbSections() {
        const menuItems = document.querySelectorAll(".click-menu a");
        const sections = document.querySelectorAll(".content-section");

        menuItems.forEach(item => {
            item.addEventListener("click", function(event) {
                // 알림창 클릭 시 다른 섹션 변경 방지
                if (item.closest('.notice-menu')) {
                    event.preventDefault();
                    return;
                }

                event.preventDefault();
                sections.forEach(section => section.classList.remove("active"));
                const targetId = this.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add("active");
                }
                menuItems.forEach(menu => menu.classList.remove("active"));
                this.classList.add("active");
            });
        });

        if (menuItems.length > 0) {
            menuItems[0].click();
        }
    }
    
    
    // setting 섹션 표시
    function setupSettingSections() {
        const settingMenus = document.querySelectorAll('.setting-menu a');
        const settingSections = document.querySelectorAll('.setting-section');

        settingMenus.forEach(menu => {
            const href = menu.getAttribute('href');
            if (href) {
                menu.addEventListener('click', function(event) {
                    event.preventDefault();
                    settingSections.forEach(section => section.classList.remove('active'));
                    settingMenus.forEach(menu => menu.classList.remove('active'));
                    this.classList.add('active');
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        targetSection.classList.add('active');
                    }
                });
            }
        });

        if (settingMenus.length > 0 && settingMenus[0].getAttribute('href')) {
            settingMenus[0].click();
        }
    }


    // friend 섹션 표시
    function setupFriendSections() {
        const friendMenus = document.querySelectorAll('.friend-menu a');
        const friendSections = document.querySelectorAll('.friend-section');

        friendMenus.forEach(menu => {
            menu.addEventListener('click', function(event) {
                event.preventDefault();
                friendSections.forEach(section => section.classList.remove('active'));
                friendMenus.forEach(menu => menu.classList.remove('active'));
                this.classList.add('active');
                const targetSection = document.querySelector(this.getAttribute('href'));
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
        if (friendMenus.length > 0) {
            friendMenus[0].click();
        }
    }


    // list toggle 버튼 작동
    function setupListToggle() {
        const toggleButtons = document.querySelectorAll(".toggle-list");

        toggleButtons.forEach(toggleButton => {
            toggleButton.addEventListener("click", function() {
                const list = toggleButton.previousElementSibling;
                list.classList.toggle("collapsed");
                toggleButton.classList.toggle("collapsed-toggle");
                toggleButton.textContent = list.classList.contains("collapsed") ? "▶" : "◀";
            });
        });
    }

    // Copy, Delete 표시
    function setupContextMenu() {
        const logTxtElements = document.querySelectorAll('.log-txt');

        logTxtElements.forEach(logTxt => {
            logTxt.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                document.querySelectorAll('.log-menu').forEach(menu => {
                    menu.classList.add('hidden');
                });
                document.querySelectorAll('.log-time').forEach(time => {
                    time.classList.remove('hidden');
                });
                const logMenu = logTxt.parentElement.querySelector('.log-menu');
                const logTime = logTxt.parentElement.querySelector('.log-time');
                logMenu.classList.remove('hidden');
                if (logTime) {
                    logTime.classList.add('hidden');
                }
            });
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.log-txt')) {
                document.querySelectorAll('.log-menu').forEach(menu => {
                    menu.classList.add('hidden');
                });
                document.querySelectorAll('.log-time').forEach(time => {
                    time.classList.remove('hidden');
                });
            }
        });
    }

    // 로그아웃, 삭제 팝업
    function setupPopups() {
        const logoutButton = document.querySelector('.logout-btn');
        const logoutPopup = document.querySelectorAll('.popup')[0];
        const confirmLogout = logoutPopup.querySelector('.confirm-logout');
        const cancelLogout = logoutPopup.querySelector('.cancel-logout');

        logoutButton.addEventListener('click', function() {
            logoutPopup.classList.remove('hidden');
        });

        confirmLogout.addEventListener('click', function() {
            logoutPopup.classList.add('hidden');
            alert('Logged out!');
        });

        cancelLogout.addEventListener('click', function() {
            logoutPopup.classList.add('hidden');
        });

        const deleteLinks = document.querySelectorAll('.delete-message');
        const deletePopup = document.querySelectorAll('.popup')[1];
        const confirmDelete = deletePopup.querySelector('.confirm-delete');
        const cancelDelete = deletePopup.querySelector('.cancel-delete');

        let targetMessage;

        deleteLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                targetMessage = event.target.closest('.chat-log');
                deletePopup.classList.remove('hidden');
            });
        });

        confirmDelete.addEventListener('click', function() {
            deletePopup.classList.add('hidden');
            if (targetMessage) {
                targetMessage.remove();
            }
        });

        cancelDelete.addEventListener('click', function() {
            deletePopup.classList.add('hidden');
        });
    }

    // 텍스트 복사
    function setupCopyMessage() {
        const copyLinks = document.querySelectorAll('.copy-message');

        copyLinks.forEach(copyLink => {
            copyLink.addEventListener('click', function(event) {
                event.preventDefault();
                const logTxt = event.target.closest('.chat-log-txt').querySelector('.log-txt').innerText;
                navigator.clipboard.writeText(logTxt);
            });
        });
    }

    function setupProfileImageUpload() {
        const profileImageWrapper = document.querySelector(".profile-image-wrapper");
        const fileInput = document.querySelector("#profile-image-upload");

        // 프로필 이미지 클릭 시 파일 입력 창 열기
        profileImageWrapper.addEventListener("click", function() {
            fileInput.click();
        });

        // 파일이 선택되면 이미지 미리보기 업데이트
        fileInput.addEventListener("change", function() {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const profileImage = profileImageWrapper.querySelector(".profile-image");
                    profileImage.src = e.target.result; // 이미지 미리보기
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 닉네임 수정 설정
    function setupUsernameEdit() {
        const usernameDiv = document.querySelector('.my-nickname');
        const editIcon = document.querySelector('.edit-nickname img');

        editIcon.addEventListener('click', function() {
            // 현재의 username을 가져옴
            const currentUsername = usernameDiv.textContent.trim();

            // input 요소 생성
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentUsername;
            input.classList.add('nickname-input');

            // 기존 username을 input으로 교체
            usernameDiv.replaceWith(input);
            input.focus();
            input.select();

            // input에서 포커스가 벗어나면 다시 div로 전환
            input.addEventListener('blur', function() {
                const newUsername = input.value.trim();
                const newUsernameDiv = document.createElement('div');
                newUsernameDiv.classList.add('my-nickname');
                newUsernameDiv.textContent = newUsername || currentUsername;
                input.replaceWith(newUsernameDiv);
                setupUsernameEdit(); // 다시 아이콘에 이벤트 리스너 추가
            });

            // 엔터 키로 입력 완료
            input.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    input.blur(); // blur 이벤트를 트리거하여 저장
                }
            });
        });
    }
    
    



    // 초기화 함수 호출
    showDate();
    updateTime();
    setupNoticePopup();
    setupGnbSections();
    setupFriendSections();
    setupSettingSections();
    setupListToggle();
    setupContextMenu();
    setupPopups();
    setupCopyMessage();
    setupProfileImageUpload();
    setupUsernameEdit();

    // 1초마다 시간 업데이트
    setInterval(updateTime, 1000);
});
