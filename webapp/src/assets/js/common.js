document.addEventListener("DOMContentLoaded", function(){

    // donut chart
    var chart = c3.generate({
        data: {
            columns: [
                ['data1', 1],
                ['data2', 1],
                ['data3', 3]
            ],
            type: 'donut',
            colors: {
                'data1': 'var(--status-confirmed)',
                'data2': 'var(--status-warning)',
                'data3': 'var(--status-error)'
            }
        },
        donut: {
            title: "Bad",
            width: 20,
            expand: false,
            label: {
                show: false
            }
        },
        legend: {
            show: false
        }
    });
    chart.resize({ width: 200, height: 235 });

    // tab
    const tab = document.querySelectorAll(".tab-btn button");
    
    tab.forEach(function(content, idx) {
        content.addEventListener("click", tabEvent)
    });
    function tabEvent() {
        const thisTab = this;
        const dataTab = thisTab.parentElement.dataset.tab;
        const thisTabs = document.querySelectorAll(".tab-btn[data-tab='"+dataTab+"'] > button");
        const tabCon = document.querySelectorAll("#"+dataTab+" > .tab-content");
        let index = 0;
        thisTabs.forEach(function(content, idx) {
            content.classList.remove("on")
            thisTab.classList.add("on")
            if (content.classList.contains("on")) {
                index = idx;
            }
        })
        tabCon.forEach(function(content, idx) {
            console.log(content)
            content.classList.remove("on");
            tabCon[index].classList.add("on");
        })
    }
    // const tabCon = document.querySelectorAll(".tab-content");
    
    // tab.forEach(function(content, idx) {
        //     content.addEventListener("click", function(){
    //         for(let i=0; i < tab.length; i++) {
        //             tab[i].classList.remove("active")
        //             tabCon[i].classList.remove("active")
    //         }
    //         content.classList.add("active");
    //         tabCon[idx].classList.add("active");
    //     });
    // });


    // select box

    function selectOption (option, box) {
        box.querySelector(".label").innerHTML = option.textContent;
        box.classList.remove("on");
    }

    function checkOption (option, box) {
        // const optionWrap = option.parentNode;
        // const total = optionWrap.querySelectorAll("li:not(.all) input[type=checkbox]").length;
        // const len = optionWrap.querySelectorAll("li:not(.all) input[type=checkbox]:checked").length;
        // const label = box.querySelector(".label");
        // if (option.querySelector("label").textContent === "전체") {
        //     const checkboxes = optionWrap.querySelectorAll("input[type=checkbox]");
        //     console.log(total, len)
        //     if (total === len) {
        //         checkboxes.forEach(function (checkbox) {
        //             checkbox.checked = false;
        //         });
        //     } else {
        //         checkboxes.forEach(function (checkbox) {
        //             checkbox.checked = true;
        //         });
        //     }
        // } else {
        //     if (len === 0) {
        //         label.innerHTML = "없음";
        //     } else {
        //         label.innerHTML = len + "건";
        //     }
        // }
    }

    document.querySelectorAll(".select-box").forEach(function (box) {
        box.querySelector(".label").addEventListener("click", function () {
            if (box.classList.contains("on")) {
                box.classList.remove("on");
            } else {
                box.classList.add("on");
            }
        });
        if (box.classList.contains("type-check")) {
            box.querySelectorAll(".option li").forEach(function (option) {
                option.addEventListener("click", function () {
                    checkOption(option, box);
                });
            });
        } else {
            box.querySelectorAll(".option li").forEach(function (option) {
                option.addEventListener("click", function () {
                    selectOption(option, box);
                });
            });
        }
    });
    

    // accordion
    const accordionWrap = document.querySelectorAll(".accordion-wrap");
    const accordionTit = document.querySelectorAll(".accordion-tit");
    const accordionCont = document.querySelectorAll(".accordion-cont");

    for(let i=0; i < accordionTit.length; i++) {
        accordionTit[i].addEventListener("click", function(){
            if(accordionWrap[i].classList.contains("on")) {
                accordionWrap[i].classList.remove("on")
            } else {
                accordionWrap[i].classList.add("on")
            }
        })
    }

    // switch
    const switchWrap = document.querySelector(".mode");
    const switchCheck = document.querySelector(".mode input[type='checkbox']")
    const switchTxt = document.querySelector(".mode label");

    switchWrap.addEventListener("click", function(){
        const body = document.getElementsByTagName("body")[0];
        if(switchCheck.checked) {
            switchTxt.innerHTML = "라이트모드"
            body.dataset.theme = "";
        } else {
            switchTxt.innerHTML = "다크<br>모드"
            body.dataset.theme = "dark";
        }
    })

});