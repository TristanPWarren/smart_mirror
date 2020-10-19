//TODO: Change User name
let userName = "Tristan";
//TODO: Replace with your API token from https://openweathermap.org/
const weatherAPIkey = 'Your API Token';
//TODO: Replace with your API token from https://newsapi.org/
const newsAPIkey = 'Your API Token';

const rotate = false;

function updateMessage() {
    console.log("Updating Message");
    let date = new Date();
    let hours = date.getHours();

    let message = "Morning";
    if (hours < 12) {
        message = "Morning";
    } else if ((hours >= 12) && (hours < 18)) {
        message = "Afternoon";
    } else if ((hours >= 18) && (hours < 21)) {
        message = "Night";
    } else {
        message = "Night";
    }

    $('#greeting-message').html(`Good ${message} ${userName}`);
}

function updateDate() {
    console.log("Updating Date");
    let date = new Date();
    let dayNumber = date.getDay();
    let monthNumber = date.getMonth()
    const listOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = listOfDays[dayNumber];
    let month = listOfMonths[monthNumber];
    let dateOfMonth = date.getDate();
    let year = date.getFullYear();

    let ordinalIndicator = "th";
    if ((dateOfMonth === 11) || (dateOfMonth === 12) || (dateOfMonth === 13)) {
        ordinalIndicator = "th";
    } else if ((dateOfMonth % 10) === 1) {
        ordinalIndicator = "st";
    } else if ((dateOfMonth % 10) === 2) {
        ordinalIndicator = "nd";
    } else if ((dateOfMonth % 10) === 3) {
        ordinalIndicator = "rd";
    }

    $('#day').html(`${day}, ${dateOfMonth}${ordinalIndicator} ${month} ${year}`);
}

function updateTime() {
    console.log("Updating Time");
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    $('#hours-minutes').html(`${hours}:${minutes}`);
    $('#seconds').html(`${seconds}`);
}

function updateWeather() {
    console.log("Updating Weather");

    //TODO: Change City ID to relevant location
    let cityID = 2644737;

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${weatherAPIkey}`,
        dataType: 'json',
    }).then((data) => {
        console.log(data);
        let icon = data.weather[0].icon;
        let location = data.name;
        let description = data.weather[0].description;
        description = description.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        let temp = Math.round((data.main.temp - 273.15) * 10) / 10;
        let feelsLike = Math.round((data.main.feels_like - 273.15) * 10) / 10;

        $('#weather-icon').css({'background-image': `url('/assets/weatherIcons/${icon}.png')`});
        $('#weather-location').html(`${location}`);
        $('#weather-description').html(`${description}`);
        $('#temp').html(`${temp}°`);
        $('#feels-like-temp').html(`${feelsLike}°`);
    }).catch((err) => {
        console.error(err);
    });
}

let newsArticles = [];
let newsPosition = 0;

function updateNews() {
    console.log("Updating News");

    $.ajax({
        url: `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsAPIkey}`,
        dataType: 'json',
    }).then((data) => {
        console.log(data);
        for (let i = 0; i < data.articles.length; i++) {
            newsArticles.push(data.articles[i]);
        }
    }).catch((err) => {
        console.error(err);
    })
}

function moveNews() {
    console.log("Moving News")

    for (let i = 0; i < 7; i++) {
        //Main news box
        $(`#news${i}`).animate({
            opacity: `${ 1 - Math.abs(i-2) * 0.33 }`,
            top: '57px',
        }, 3000, (e) => {
            $('#load-message').hide();
            let position = (9 + newsPosition + i) % 10;
            $(`#news${i}`).html(`
                <div class="news-item-title">${newsArticles[position].title} [${newsArticles[position].author}]</div>
                <div class="news-item-details">${newsArticles[position].description}</div>`);
            $(`#news${i}`).css({
                opacity: `${ 1 - Math.abs(i-3) * 0.33 }`,
                top: '0px',
            })
        });

        //News title
        $(`#news${i} > .news-item-title`).animate({
            'font-size': `${ 27 - Math.abs(i-2) * 5 }px`,
        }, 3000, (e) => {
            $(`#news${i} > .news-item-title`).css({
                'font-size': `${ 27 - Math.abs(i-3) * 5 }px`,
            })
        });

        //News description
        $(`#news${i} > .news-item-details`).animate({
            'font-size': `${ 18 - Math.abs(i-2) * 3 }px`,
        }, 3000, (e) => {
            $(`#news${i} > .news-item-details`).css({
                'font-size': `${ 18 - Math.abs(i-3) * 3 }px`,
            })
        });
    }

    newsPosition = (newsPosition - 1) % 10;
}

function rotateMirror() {
    $('#main-mirror').css({
        'transform': 'rotate(90deg) translateY(-100vw)',
        'height': 'calc(100vw - 60px)',
    });
    $('#news').css({
        'margin-top': 'calc(100vw - 370px)',
    });
}

$(() => {
    if (rotate) {
        rotateMirror();
    }

    updateMessage();
    updateDate();
    updateTime();
    updateWeather();
    updateNews();

    setInterval(updateMessage, 180000);
    setInterval(updateDate, 60000);
    setInterval(updateTime, 1000);
    setInterval(updateWeather, 600000);
    setInterval(updateNews, 600000);
    moveNews();
    setInterval(moveNews, 15000);
});