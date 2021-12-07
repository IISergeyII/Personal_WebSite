// Opening of the relevant Skillset tab and closing all other Skillset tabs.
function openSkill(skillName) {
    let i, tabcontent, tablinks;

    // Delete previously opened
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(skillName).style.display = "block";
}

function closeSkill(elem) {
    elem.parentElement.parentElement.style.display='none';
}

window.addEventListener('scroll', function(e) {
    let navigationHeight = $("#navmenu").outerHeight();
    let scrollDistance = $(window).scrollTop();

    $(".navsection").each(function (i) {
        if ($(this).position().top <= scrollDistance + navigationHeight) {
            $(".navbar-nav").find("li.active").removeClass("active");
            $(".navbar-nav li").eq(i).addClass("active");
        }
    });
});
