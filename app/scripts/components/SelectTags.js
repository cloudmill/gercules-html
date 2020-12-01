$(() => {

    $(".select-tags").each(function () {

        const

            component = $(this),

            button = {
                reset: component.find(".select-tags__tag--reset"),
                slide: component.find(".select-tags__button"),
            },

            container = {
                pool: component.find(".select-tags__wrap"),
                selection: component.find(".select-tags__selection"),
            };



        function updateSlideButtonSize() {

            const
                style = getComputedStyle(button.slide[0]),
                paddingLeft = parseFloat(style.paddingLeft),
                paddingRight = parseFloat(style.paddingRight),
                paddingHorizontal = paddingLeft + paddingRight;
                
            let
                size,
                maxSize;

            button.slide.find(".select-tags__button-text").each(function () {

                size = $(this).width();
                maxSize = maxSize ? (size > maxSize ? size : maxSize) : size;

            });

            button.slide.css("min-width", maxSize + paddingHorizontal + "px");

        }

        document.fonts.ready.then(() => updateSlideButtonSize());
        


        button.slide.on("click", () => {

            button.slide.toggleClass("select-tags__button--active");
            button.slide.find(".select-tags__button-text").toggleClass("select-tags__button-text--active");

        });

    });

});
