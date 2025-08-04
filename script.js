// jQuery for smooth scrolling on anchor link clicks
$(document).ready(function () {
    $('nav ul li a').click(function (event) {
        event.preventDefault();

        var target = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });

      function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('show');
  }


  
    // jQuery for form submission animation
    $('#contact-form').submit(function (event) {
        event.preventDefault();

        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        if (name && email && message) {
            alert("Thanks for reaching out! I'll get back to you soon.");
            $('#contact-form')[0].reset();
        } else {
            alert("Please fill all the fields.");
        }
    });
});
$(document).ready(function () {
    // Smooth scrolling for internal links
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800
            );
        }
    });

    // Add hover effect for cards
    $(".project-card").hover(
        function () {
            $(this).css("box-shadow", "0 15px 30px rgba(0, 0, 0, 0.3)");
        },
        function () {
            $(this).css("box-shadow", "0 8px 20px rgba(0, 0, 0, 0.1)");
        }
    );
});
/*$(document).ready(function () {
    let currentIndex = 0; // Track the current index
    const items = $('.carousel-item'); // All carousel items
    const itemCount = items.length; // Total number of items

    function showItem(index) {
        const offset = -index * 100; // Calculate offset for the slide
        $('.carousel').css('transform', `translateX(${offset}%)`);
    }

    // Next button functionality
    $('.next').click(function () {
        currentIndex = (currentIndex + 1) % itemCount; // Increment index
        showItem(currentIndex); // Update carousel position
    });

    // Previous button functionality
    $('.prev').click(function () {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount; // Decrement index
        showItem(currentIndex); // Update carousel position
    });

    
});*/


// Bootstrap handles the fade effect automatically with data-bs-ride="carousel"
// This script ensures indicators update properly
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let currentIndex = 0;

// Function to check screen size and update layout
function checkScreenSize() {
    let isMobileView = window.innerWidth <= 768;

    if (isMobileView) {
        // Disable carousel: Show all items stacked
        carousel.style.display = "block";
        carousel.style.transform = "none";
        items.forEach(item => {
            item.style.flex = "1 1 100%";
            item.style.display = "block";
            item.style.marginBottom = "20px"; // Adds spacing between projects
        });

        // Hide navigation controls & indicators
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        if (indicatorsContainer) indicatorsContainer.style.display = "none";
    } else {
        // Enable carousel: One project per slide
        carousel.style.display = "flex";
        items.forEach(item => {
            item.style.flex = "0 0 100%";
            item.style.display = "block";
        });

        // Show navigation controls & indicators
        prevButton.style.display = "block";
        nextButton.style.display = "block";
        if (indicatorsContainer) indicatorsContainer.style.display = "flex";
    }
}

// Update carousel navigation (only if not in mobile view)
function updateCarousel() {
    if (window.innerWidth > 768) {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        document.querySelectorAll('.carousel-indicators div').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
}

// Navigation buttons
prevButton.addEventListener('click', () => {
    if (window.innerWidth > 768) {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (window.innerWidth > 768) {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }
});

// Listen for window resize
window.addEventListener('resize', checkScreenSize);

// Run on page load
checkScreenSize();




document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-btn').addEventListener('click', () => {
        const form = document.getElementById('contact-form');
        form.classList.toggle('hidden'); // Toggle 'hidden' class
    });

    document.getElementById('send-btn').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        emailjs.send("service_krk1nkk", "template_9nb0kjq", {
            from_name: name,
            from_email: email,
            message: message,
        }, "5cXLuIGPqxEaYamF")
        .then(() => {
            alert('Notification sent successfully!');
            document.getElementById('contact-form').reset();
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
            alert('Failed to send notification. Please try again.');
        });
    });
});
