document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('#mode-toggle');
    const icons = document.querySelectorAll('.icon'); // 모든 아이콘을 선택

    
    function setIconSources(mode) {
        const suffix = mode === 'dark' ? '_dark.svg' : '_light.svg';
        icons.forEach(icon => {
            let iconType;
            icon.classList.forEach(cls => {
                if (cls.endsWith('-icon')) {
                    iconType = cls.replace('-icon', '');
                }
            });

            if (iconType) {
                icon.src = `../image/${iconType}${suffix}`;
            }
        });
    }

    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';
    toggleSwitch.textContent = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    setIconSources(currentTheme);

    
    toggleSwitch.addEventListener('click', function() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleSwitch.textContent = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        setIconSources(newTheme);
    });
});
