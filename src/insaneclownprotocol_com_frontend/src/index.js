import "../assets/css/bootstrap.min.css";
import "../assets/css/aos.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

const fmt = new Intl.NumberFormat("de-DE");
const MAX_SUPPLY = 1000000000;

(function ($) {
    //preloader js
    $(window).on('load', function () {
        $('.preloader').fadeOut(1000);
    });

    //Header
    var fixed_top = $("header");
    $(window).on('load', function () {
        if ($(this).scrollTop() > -1) {
            fixed_top.addClass("header--fixed animated fadeInDown");
        } else {
            fixed_top.removeClass("header--fixed animated fadeInDown");
        }
    });

    //close mobile menu after clicking nav-link
    $(".nav-link").click(function () {
        $(".navbar-toggler").addClass("collapsed");
    });
    $(".nav-link").click(function () {
        $(".navbar-collapse").removeClass("show");
    });

    //Animation on Scroll initializing
    AOS.init();

    //# Chart Control
    Chart.register(ChartDataLabels);
    Chart.defaults.font.size = 24;

    const myPieChart = document.querySelector("#myPieChart");
    if (myPieChart) {
        const ctx = myPieChart.getContext('2d');
        const data = {
            labels: ['Treasury', 'Sneedlocked LP', 'Sneed DAO', 'Free-float'],
            datasets: [{
                data: [19.4, 5.5, 6, 69.1],
                backgroundColor: [
                    '#088a28',                                                                                                                
                    '#54d9fe',
                    '#5553f8',
                    '#f84742',
                ],
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 4
            }]
        };

        const options = {
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed) {
                                label += fmt.format((MAX_SUPPLY * context.parsed / 100).toFixed(0)) + ' $CLOWN';
                            }
                            return label;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: "#000000",
                    formatter: function(value, context) {
                        return value + '%';
                    }
                }
            },
            cutout: '32%',
            responsive: true,
            maintainAspectRatio: false,
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }
})(jQuery);