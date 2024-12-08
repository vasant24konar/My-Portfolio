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
    const itemWidth = 100; // Assume each item is 100% width
    const itemCount = items.length; // Total number of items

    // Clone the first item to the end for seamless looping
    const firstItemClone = items.first().clone();
    carousel.append(firstItemClone);

    let currentIndex = 0; // Current active index
    let isAnimating = false; // To prevent overlapping animations

    function moveCarousel() {
        if (isAnimating) return; // Skip if already animating
        isAnimating = true;

        // Animate to the next slide
        carousel.css('transition', 'transform 0.5s ease-in-out');
        carousel.css('transform', `translateX(${-currentIndex * itemWidth}%)`);

        // Check if we're on the cloned slide
        setTimeout(() => {
            if (currentIndex >= itemCount) {
                // Reset position to the original first slide
                carousel.css('transition', 'none');
                carousel.css('transform', 'translateX(0%)');
                currentIndex = 0;
            }
            isAnimating = false;
        }, 100); // Match transition duration
    }

    // Next button functionality
    $('.next').click(function () {
        currentIndex++;
        moveCarousel();
    });

    // Previous button functionality
    $('.prev').click(function () {
        if (isAnimating) return; // Skip if already animating

        if (currentIndex === 0) {
            // Jump to the cloned last slide
            carousel.css('transition', 'none');
            carousel.css('transform', `translateX(${-itemCount * itemWidth}%)`);
            currentIndex = itemCount - 1; // Set to the last real slide
        } else {
            currentIndex--;
        }

        setTimeout(moveCarousel, 50); // Add delay for smooth transition
    });

    
});

document.getElementById('contact-btn').addEventListener('click', () => {
    const form = document.getElementById('contact-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('send-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    emailjs
        .send("service_krk1nkk", "template_9nb0kjq", {
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
