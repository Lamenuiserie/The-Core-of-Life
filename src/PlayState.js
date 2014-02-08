/*globals FM */
/**
 * @author Simon Chauvin
 */
var playState = function () {
    "use strict";
    FM.State.apply(this);
    this.lifeForms = [];
    this.lifeForms1 = [];
    this.lifeForms2 = [];
    this.lifeForms3 = [];
    this.lifeForms4 = [];
    this.formFollowing = null;
    this.isExpanding = false;
    this.isReversingX = false;
    this.isReversingY = false;
    this.oldForm = null;
    this.background = null;
    this.music = null;
};
playState.prototype = Object.create(FM.State.prototype);
/**
 * 
 * @returns {undefined}
 */
playState.prototype.init = function () {
    FM.State.prototype.init.apply(this, [parameters.WORLD_WIDTH, parameters.WORLD_HEIGHT]);

    this.bounds = new FM.Rectangle(0, 0, this.getWorld().width, this.getWorld().height);

    this.isReversingX = this.bounds.width > 0;
    this.isReversingY = this.bounds.height > 0;

    var credits = new FM.GameObject(0);
    credits.addComponent(new FM.SpatialComponent(parameters.WORLD_WIDTH / 2 - (FM.Game.getScreenWidth() / 2) + 20, parameters.WORLD_HEIGHT / 2 - (FM.Game.getScreenHeight() / 2) - 40, credits));
    credits.addComponent(new FM.SpriteRendererComponent(FM.AssetManager.getAssetByName("credits"), 1024, 768, credits));
    this.add(credits);

    this.background = new FM.GameObject(0);
    this.background.addComponent(new FM.SpatialComponent(0, 0, this.background));
    this.background.addComponent(new FM.SpriteRendererComponent(FM.AssetManager.getAssetByName("background"), parameters.WORLD_WIDTH, parameters.WORLD_HEIGHT, this.background));
    this.add(this.background);

    var form = lifeForm(500, 500, "lifeForm1", 1);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms1.push(form);

    form = lifeForm(1300, 1600, "lifeForm2", 2);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms2.push(form);

    form = lifeForm(1500, 1200, "lifeForm3", 3);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms3.push(form);

    form = lifeForm(1000, 1600, "lifeForm4", 4);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms4.push(form);

    form = lifeForm(2500, 1100, "lifeForm3", 3);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms3.push(form);

    form = lifeForm(2000, 500, "lifeForm4", 4);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms4.push(form);

    form = lifeForm(500, 1700, "lifeForm3", 3);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms3.push(form);

    form = lifeForm(900, 1000, "lifeForm4", 4);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms4.push(form);

    form = lifeForm(250, 450, "lifeForm3", 3);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms3.push(form);

    form = lifeForm(400, 1900, "lifeForm4", 4);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms4.push(form);

    form = lifeForm(1800, 400, "lifeForm3", 3);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms3.push(form);

    form = lifeForm(2000, 1900, "lifeForm4", 4);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms4.push(form);

    form = lifeForm(1500, 1600, "lifeForm3", 3);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms3.push(form);

    form = lifeForm(1900, 100, "lifeForm4", 4);
    form.bounds = this.bounds;
    this.add(form);
    this.lifeForms.push(form);
    this.lifeForms4.push(form);

    this.centerCameraAt(parameters.WORLD_WIDTH / 2, parameters.WORLD_HEIGHT / 2);
};

playState.prototype.update = function (dt) {
    FM.State.prototype.update.apply(this, [dt]);

    //World shrinking
    var backgroundSpatial = this.background.components[FM.ComponentTypes.SPATIAL],
        backgroundRenderer = this.background.components[FM.ComponentTypes.RENDERER],
        i,
        form,
        formRenderer,
        formPhysic,
        formWidth;
    if (this.isExpanding) {
        this.isReversingX = this.bounds.width < parameters.WORLD_WIDTH;
        this.isReversingY = this.bounds.height < parameters.WORLD_HEIGHT;
    } else {
        this.isReversingX = this.bounds.width > 100;
        this.isReversingY = this.bounds.height > 100;
    }
    if (this.isReversingX) {
        if (this.isExpanding) {
            backgroundSpatial.position.x -= parameters.currentShrinkingWidth / 2;
            backgroundRenderer.setWidth(backgroundRenderer.getWidth() + parameters.currentShrinkingWidth);
            for (i = 0; i < this.lifeForms.length; i++) {
                form = this.lifeForms[i];
                formRenderer = form.components[FM.ComponentTypes.RENDERER];
                formPhysic = form.components[FM.ComponentTypes.PHYSIC];
                formWidth = formRenderer.getWidth();
                formRenderer.setWidth(formWidth + (formWidth * parameters.currentShrinkingWidth * 0.0008));
                formPhysic.width = formPhysic.width + (formPhysic.width * parameters.currentShrinkingWidth * 0.0008);
            }
        } else {
            backgroundSpatial.position.x += parameters.currentShrinkingWidth / 2;
            backgroundRenderer.setWidth(backgroundRenderer.getWidth() - parameters.currentShrinkingWidth);
            for (i = 0; i < this.lifeForms.length; i++) {
                form = this.lifeForms[i];
                formRenderer = form.components[FM.ComponentTypes.RENDERER];
                formPhysic = form.components[FM.ComponentTypes.PHYSIC];
                formWidth = formRenderer.getWidth();
                formRenderer.setWidth(formWidth - (formWidth * parameters.currentShrinkingWidth * 0.0008));
                formPhysic.width = formPhysic.width - (formPhysic.width * parameters.currentShrinkingWidth * 0.0008);
            }
        }
        this.bounds.x = backgroundSpatial.position.x;
        this.bounds.width = backgroundRenderer.getWidth();
        form.bounds = this.bounds;
    } else {
        this.isExpanding = !this.isExpanding;
    }
    if (this.isReversingY) {
        if (this.isExpanding) {
            backgroundSpatial.position.y -= parameters.currentShrinkingHeight / 2;
            backgroundRenderer.setHeight(backgroundRenderer.getHeight() + parameters.currentShrinkingHeight);
            for (i = 0; i < this.lifeForms.length; i++) {
                form = this.lifeForms[i];
                formRenderer = form.components[FM.ComponentTypes.RENDERER];
                formPhysic = form.components[FM.ComponentTypes.PHYSIC];
                formHeight = formRenderer.getHeight();
                formRenderer.setHeight(formHeight + (formHeight * parameters.currentShrinkingHeight * 0.0008));
                formPhysic.height = formPhysic.height + (formPhysic.height * parameters.currentShrinkingHeight * 0.0008);
            }
        } else {
            backgroundSpatial.position.y += parameters.currentShrinkingHeight / 2;
            backgroundRenderer.setHeight(backgroundRenderer.getHeight() - parameters.currentShrinkingHeight);
            for (i = 0; i < this.lifeForms.length; i++) {
                form = this.lifeForms[i];
                formRenderer = form.components[FM.ComponentTypes.RENDERER];
                formPhysic = form.components[FM.ComponentTypes.PHYSIC];
                formHeight = formRenderer.getHeight();
                formRenderer.setHeight(formHeight - (formHeight * parameters.currentShrinkingHeight * 0.0008));
                formPhysic.height = formPhysic.height - (formPhysic.height * parameters.currentShrinkingHeight * 0.0008);
            }
        }
        this.bounds.y = backgroundSpatial.position.y;
        this.bounds.height = backgroundRenderer.getHeight();
        form.bounds = this.bounds;
    }

    //Handle clicks on forms
    if (FM.Game.isMouseClicked()) {
        var i = 0,
            form,
            formSpatial,
            formRenderer,
            formWidth,
            formHeight,
            mouseX = FM.Game.getMouseX(),
            mouseY = FM.Game.getMouseY(),
            formX,
            formY,
            positive,
            xVelocity,
            yVelocity;
        for (i = 0; i < this.lifeForms.length; i++) {
            form = this.lifeForms[i],
            formSpatial = form.components[FM.ComponentTypes.SPATIAL],
            formRenderer = form.components[FM.ComponentTypes.RENDERER],
            formWidth = formRenderer.getWidth(),
            formHeight = formRenderer.getHeight(),
            formX = formSpatial.position.x,
            formY = formSpatial.position.y;

            if (mouseX >= formX && mouseX <= formX + formWidth
                && mouseY >= formY && mouseY <= formY + formHeight) {
                if (!this.formFollowing) {
                    form.physicComponent.velocity.reset(0, 0);
                    this.centerCameraOn(form);
                    this.follow(form, FM.Game.getScreenWidth() / 2, FM.Game.getScreenHeight() / 2, true);
                    form.followPlayer = true;
                    this.formFollowing = form;
                } else {
                    positive = Math.random();
                    xVelocity = 1;
                    yVelocity = 1;
                    if (positive > 0.5) {
                        xVelocity = Math.random() * 70;
                    } else {
                        xVelocity = -Math.random() * 70;
                    }
                    positive = Math.random();
                    if (positive > 0.5) {
                        yVelocity = Math.random() * 70;
                    } else {
                        yVelocity = -Math.random() * 70;
                    }
                    this.formFollowing.physicComponent.velocity.reset(xVelocity, yVelocity);
                    this.unFollow();
                    this.formFollowing.followPlayer = false;
                    form.physicComponent.velocity.reset(0, 0);
                    this.centerCameraOn(form);
                    this.follow(form, FM.Game.getScreenWidth() / 2, FM.Game.getScreenHeight() / 2, true);
                    form.followPlayer = true;
                    this.formFollowing = form;
                }
                i = this.lifeForms.length;
            }
        }
    }

    //Handle interaction between life forms
    var i = 0, j = 0;
    for (i = 0; i < this.lifeForms.length; i++) {
        var form = this.lifeForms[i];
        for (j = 0; j < this.lifeForms3.length; j++) {
            var form3 = this.lifeForms3[j];
            if (form.physicComponent.overlapsWithObject(form3.physicComponent)) {
                if (form.type === 1) {
                    if (form3.renderer.getCurrentAnim() !== "die" && (form3.renderer.getCurrentAnim() !== "revive" || form3.renderer.finished) && !form3.dead) {
                        form3.dead = true;
                        form3.renderer.play("die");
                        if (this.isExpanding) {
                            parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                        } else {
                            parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                        }
                    }
                } else if (form.type === 2) {
                    if (form3.renderer.getCurrentAnim() !== "revive" && (form3.renderer.getCurrentAnim() !== "die" || form3.renderer.finished) && form3.dead) {
                        form3.dead = false;
                        form3.renderer.play("revive");
                        if (this.isExpanding) {
                            parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                        } else {
                            parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                        }
                    }
                }
            }
        }
        this.oldForm = null;
        for (j = 0; j < this.lifeForms4.length; j++) {
            var form4 = this.lifeForms4[j];
            if (form.physicComponent.overlapsWithObject(form4.physicComponent)) {
                if (form.type === 1) {
                    if (form4.renderer.getCurrentAnim() !== "die" && (form4.renderer.getCurrentAnim() !== "revive" || form4.renderer.finished) && !form4.dead) {
                        form4.dead = true;
                        form4.renderer.play("die");
                        if (this.isExpanding) {
                            parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                        } else {
                            parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                        }
                    }
                } else if (form.type === 2) {
                    if (form4.renderer.getCurrentAnim() !== "revive" && (form4.renderer.getCurrentAnim() !== "die" || form4.renderer.finished) && form4.dead) {
                        form4.dead = false;
                        form4.renderer.play("revive");
                        if (this.isExpanding) {
                            parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                        } else {
                            parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                            parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                        }
                    }
                }
            }
        }
    }
};
/**
 * 
 * @param {type} curMusic
 */
playState.prototype.setMusic = function (curMusic) {
    this.music = curMusic;
};