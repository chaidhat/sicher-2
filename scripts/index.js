async function fetchServer(data) {
    const response = await fetch("https://server-singapore.scholarity.io/", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function goToLecture(sicherLectureId) {
    window.location.href = `/lecture.html?id=${sicherLectureId}`;
}

async function populateLectureList () {
    const data = await fetchServer({action: "sicher_getTopLectures"});

    for (let i = 0; i < data.data.length; i++) {
        const listHtml = `
        <div class="col">
            <div class="tile news-tile shadow animation-up" id="lecture-list-${i}">
                <h2>${decodeURI(data.data[i].lectureName)}</h2>
                <p>${decodeURI(data.data[i].data)}...</p>
                <span class="material-symbols-outlined">
                arrow_forward
                </span>
            </div>
        </div>`;
        $('#lecture-list').append(listHtml);
        $(`#lecture-list-${i}`).click(function () {
            goToLecture(data.data[i].sicherLectureId);
        });

        const carouselHtml = `
        <div class="client carousel-item${i === 0 ? " active" : ""}">
            <div class="inner">
                <div class="tile news-tile shadow animation-up" id="lecture-carousel-${i}">
                    <h2>${decodeURI(data.data[i].lectureName)}</h2>
                    <p>${decodeURI(data.data[i].data)}...</p>
                    <span class="material-symbols-outlined">
                    arrow_forward
                    </span>
                </div>
            </div>
        </div>`;
        $('#lecture-carousel-list').append(carouselHtml);
        $(`#lecture-carousel-${i}`).click(function () {
            goToLecture(data.data[i].sicherLectureId);
        });
    }
}

$(document).ready(function(){
    populateLectureList();
});