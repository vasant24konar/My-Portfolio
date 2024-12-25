// jQuery for smooth scrolling on anchor link clicks
$(document).ready(function () {
    $('nav ul li a').click(function (event) {
        event.preventDefault();

        var target = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });

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

$(document).ready(function () {
    const carousel = $('.carousel'); // Carousel container
    const items = $('.carousel-item'); // All carousel items
    const itemCount = items.length; // Total number of items
    const itemWidth = items.outerWidth(true); // Get the width of a single item, including margin

    let currentIndex = 0; // Current active index
    let isAnimating = false; // To prevent overlapping animations

    // Function to move the carousel and highlight the active item
    function moveCarousel() {
        if (isAnimating) return; // Skip if already animating
        isAnimating = true;

        // Animate to the next item (horizontal carousel)
        carousel.css('transition', 'transform 0.5s ease-in-out');
        carousel.css('transform', `translateX(${-currentIndex * itemWidth}px)`);

        // Highlight the active item and reset others
        items.removeClass('active'); // Remove 'active' class from all items
        $(items[currentIndex]).addClass('active'); // Add 'active' class to the current item

        // Cycle through the items smoothly
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Match transition duration
    }

    // Next button functionality
    $('.next').click(function () {
        currentIndex++;
        if (currentIndex >= itemCount) {
            currentIndex = 0; // Reset to first item if we reach the end
        }
        moveCarousel();
    });

    // Previous button functionality
    $('.prev').click(function () {
        if (isAnimating) return; // Skip if already animating
        if (currentIndex === 0) {
            currentIndex = itemCount - 1; // Jump to last item if at the first one
        } else {
            currentIndex--;
        }
        moveCarousel();
    });

    // Adjust layout for smaller screens (no carousel, just column format)
    if ($(window).width() <= 767) {
        // Switch to a column layout for small screens
        carousel.css('display', 'block');
        items.css('display', 'block'); // Stack items vertically
        $('.next, .prev').hide(); // Hide navigation buttons on small screens
    } else {
        // Ensure the carousel is in the correct state for larger screens
        $('.next, .prev').show(); // Show navigation buttons for large screens
        carousel.css('display', 'flex'); // Keep the carousel as flex for horizontal layout
    }

    // Optional: Recheck the layout when the window resizes
    $(window).resize(function () {
        if ($(window).width() <= 767) {
            // Switch to column layout for small screens
            carousel.css('display', 'block');
            items.css('display', 'block');
            $('.next, .prev').hide(); // Hide navigation buttons
        } else {
            // Switch back to the carousel for large screens
            $('.next, .prev').show();
            carousel.css('display', 'flex');
        }
    });
});


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
