// إنشاء النجوم في الخلفية
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 5 + Math.random() * 10;
        const opacity = 0.5 + Math.random() * 0.5;
        const delay = Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
        star.style.opacity = opacity;
        
        starsContainer.appendChild(star);
    }
}

// مشغل الموسيقى
function initMusicPlayer() {
    const audio = new Audio();
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const songCover = document.querySelector('.song-cover');
    
    let isPlaying = false;
    let isSongLoaded = false;
    
    // قائمة الأغاني
    const songs = [
        {
            title: "الأغنية الأولى",
            artist: "الفنان الأول",
            cover: "https://i.pinimg.com/736x/77/4f/48/774f4865cf1f9d861f0d44a88840b2b3.jpg",
            src: "https://d.top4top.io/m_3461kbz0q1.mp3"
        },
        {
            title: "الأغنية الثانية",
            artist: "الفنان الثاني",
            cover: "https://www.icegif.com/wp-content/uploads/icegif-2606.gif",
            src: "https://f.top4top.io/m_3461p3ez91.mp3"
        }
    ];
    
    let currentSongIndex = 0;
    
    // تحميل الأغنية الحالية
    function loadSong() {
        const song = songs[currentSongIndex];
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        songCover.src = song.cover;
        audio.src = song.src;
        isSongLoaded = true;
        
        audio.addEventListener('canplay', () => {
            if (isPlaying) {
                audio.play().catch(e => console.log("لم يتم تشغيل الأغنية:", e));
            }
        });
    }
    
    // تشغيل أو إيقاف الأغنية
    function togglePlay() {
        if (!isSongLoaded) {
            loadSong();
            isPlaying = true;
        }
        
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play().catch(e => {
                console.log("خطأ في التشغيل:", e);
                loadSong();
                audio.play();
            });
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // الأغنية التالية
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        isPlaying = true;
        loadSong();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // الأغنية السابقة
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        isPlaying = true;
        loadSong();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // تحديث شريط التقدم
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
    
    // النقر على شريط التقدم
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // تهيئة الأحداث
    function setupEventListeners() {
        playBtn.addEventListener('click', togglePlay);
        nextBtn.addEventListener('click', nextSong);
        prevBtn.addEventListener('click', prevSong);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
        progressContainer.addEventListener('click', setProgress);
    }
    
    // بدء التشغيل
    loadSong();
    setupEventListeners();
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initMusicPlayer();
});