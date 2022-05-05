import { gsap, Linear, Sine } from "gsap";

class SnowflakesGenerator {
    totalSnowflakes: number = 100;
    minSize: number = 10;
    maxSize: number = 20;
    container: HTMLElement;
    w: number;
    h: number;
    snowBtn: HTMLTemplateElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.w = this.container.offsetWidth;
        this.h = this.container.offsetHeight;
        this.snowBtn = document.getElementById("snow-btn") as HTMLTemplateElement;
        this.snowBtn.addEventListener("click", this.toggleSnowflakes.bind(this));
    }

    randomBiasBetween(min: number, max: number, bias: number, influence: number) {
        let rnd = Math.random() * (max - min) + min;
        let mix = Math.random() * influence;
        return rnd * (1 - mix) + bias * mix;
    }

    randomBetween(min: number, max: number) {
        return min + Math.random() * (max - min);
    }

    createSnowflakes() {
        // creates snowflakes in div container
        for (let i = 0; i < this.totalSnowflakes; i++) {
            let snowflake = document.createElement("div");
            // starting position
            gsap.set(snowflake, {
                attr: { class: "snowflake" },
                x: this.randomBetween(0, this.w),
                y: this.randomBetween(-50, -50),
            });

            //set other css variable values
            snowflake.style.setProperty(
                "--s-size",
                this.randomBiasBetween(this.minSize, this.maxSize, this.minSize, 0.9) +
                "px"
            );

            snowflake.style.setProperty("--s-opacity", (this.randomBetween(0.75, 1)).toString());
            this.container.appendChild(snowflake);
        }
    }

    updateSnowflakes(snowflakes: NodeListOf<Element>) {
        // update width and height
        this.w = this.container.offsetWidth;
        this.h = this.container.offsetHeight;

        snowflakes.forEach((snowflake) => {
            // set position of snowflake
            gsap.set(snowflake, {
                attr: { class: "snowflake" },
                x: this.randomBetween(0, this.w),
                y: this.randomBetween(-50, -50),
            });

            // set animation
            this.setFallAnimation(snowflake);
        });
    }

    setFallAnimation(snowflake: Element) {
        // falling anim (elm, duration, {settings})
        gsap.to(snowflake, this.randomBetween(60, 120), {
            y: this.h + 100,
            ease: Linear.easeNone,
            repeat: -1,
            delay: -100,
        });
        // swinging side to side using Sine wave anim
        gsap.to(snowflake, this.randomBetween(100, 100), {
            x: "+=300", // width of sine wave
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut,
        });
    }

    setAnimations(snowflakes: NodeListOf<Element>) {
        snowflakes.forEach((s) => this.setFallAnimation(s));
    }

    removeAnimations(snowflakes: NodeListOf<Element>) {
        gsap.killTweensOf(snowflakes);
    }

    toggleSnowflakes() {
        // toggle show button class
        this.snowBtn.classList.toggle("snow-playing");

        // get all snowflake divs
        let snowflakes = this.container.querySelectorAll(".snowflake");

        if (snowflakes.length == 0) {
            // if no snowflakes in div
            // then create them
            this.createSnowflakes();
            // and get them again
            snowflakes = this.container.querySelectorAll(".snowflake");
        }

        if (this.snowBtn.classList.contains("snow-playing")) {
            // update and set animation
            this.updateSnowflakes(snowflakes);
        } else {
            // stop animation
            // remove nodes of apply fade animation
            this.removeAllChildNodes(this.container);
        }
    }

    removeAllChildNodes(parent: Element) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

export default SnowflakesGenerator;