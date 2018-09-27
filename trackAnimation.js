vectorToString = function (vector) {
    return vector.x.toString() + " " + vector.y.toString() + " " + vector.z.toString();
};

eulerToDegreesToString = function (euler) {
    let x = THREE.Math.radToDeg(euler.x);
    let y = THREE.Math.radToDeg(euler.y);
    let z = THREE.Math.radToDeg(euler.z);
    return x.toString() + " " + y.toString() + " " + z.toString();
};

compareVectors = function (v1, v2) {
    return vectorToString(v1) == vectorToString(v2);
};

AFRAME.registerComponent("trackanimation", {
    schema: {
        pointA: {type: "vec3"},
        rotA: {type: "vec3"},
        pointB: {type: "vec3"},
        rotB: {type: "vec3"},
        pointC: {type: "vec3"},
        rotC: {type: "vec3"},
        pointD: {type: "vec3"},
        rotD: {type: "vec3"},
        speed: {type: "number", default: 20}
    },

    init: function () {
        let helperVec = new THREE.Vector3();
        // let eulerHelper = new THREE.Euler(0, 90, 0);
        this.el.setAttribute("position", this.data.pointA);
        this.el.setAttribute("rotation", this.data.rotA);

        this.rotated = true;

        this.points = [];
        this.points.push(this.data.pointA);
        this.points.push(this.data.pointB);
        this.points.push(this.data.pointC);
        this.points.push(this.data.pointD);

        this.rots = [];
        this.rots.push(this.data.rotA);
        this.rots.push(this.data.rotB);
        this.rots.push(this.data.rotC);
        this.rots.push(this.data.rotD);

        console.log(this.points);
        let adjustableTimeConstant = 1000;

        helperVec.copy(this.points[0]).sub(this.points[1]);
        this.time12 = 0;
        if (helperVec.length() > 0)
            this.time12 = (helperVec.length() / this.data.speed) * adjustableTimeConstant;
        // let r1 = eulerToDegreesToString(eulerHelper);
        // console.log(eulerHelper);
        // console.log(r1);

        helperVec.copy(this.points[1]).sub(this.points[2]);
        this.time23 = 0;
        if (helperVec.length() > 0)
            this.time23 = (helperVec.length() / this.data.speed) * adjustableTimeConstant;
        // eulerHelper.setFromVector3(helperVec);
        // let r2 = eulerToDegreesToString(eulerHelper);
        // console.log(eulerHelper);
        // console.log(r2);

        helperVec.copy(this.points[2]).sub(this.points[3]);
        this.time34 = 0;
        if (helperVec.length() > 0)
            this.time34 = (helperVec.length() / this.data.speed) * adjustableTimeConstant;
        // eulerHelper.setFromVector3(helperVec);
        // let r3 = eulerToDegreesToString(eulerHelper);
        // console.log(eulerHelper);
        // console.log(r3);

        helperVec.copy(this.points[3]).sub(this.points[0]);
        this.time41 = 0;
        if (helperVec.length() > 0)
            this.time41 = (helperVec.length() / this.data.speed) * adjustableTimeConstant;
        // eulerHelper.setFromVector3(helperVec);
        // let r4 = eulerToDegreesToString(eulerHelper);
        // console.log(eulerHelper);
        // console.log(r4);


        this.animTimeFrame = ["12", this.time12];

        let anim1 = document.createElement("a-animation");
        let animr1 = document.createElement("a-animation");
        let anim2 = document.createElement("a-animation");
        let animr2 = document.createElement("a-animation");
        let anim3 = document.createElement("a-animation");
        let animr3 = document.createElement("a-animation");
        let anim4 = document.createElement("a-animation");
        let animr4 = document.createElement("a-animation");

        let anims = [anim1, anim2, anim3, anim4];
        let animr = [animr1, animr2, animr3, animr4];

        if (this.time == null) this.time = Math.floor(7 * this.time12 / 8);
        console.log(this.animTimeFrame);

        anim4.setAttribute("to", vectorToString(this.points[0]));
        anim1.setAttribute("from", vectorToString(this.points[0]));
        anim1.setAttribute("to", vectorToString(this.points[1]));
        anim1.setAttribute("dur", (this.time12).toString());
        anim2.setAttribute("from", vectorToString(this.points[1]));
        anim2.setAttribute("to", vectorToString(this.points[2]));
        anim2.setAttribute("dur", (this.time23).toString());
        anim3.setAttribute("from", vectorToString(this.points[2]));
        anim3.setAttribute("to", vectorToString(this.points[3]));
        anim3.setAttribute("dur", (this.time34).toString());
        anim4.setAttribute("from", vectorToString(this.points[3]));
        anim4.setAttribute("dur", (this.time41).toString());

        animr4.setAttribute("to", vectorToString(this.rots[3]));
        animr1.setAttribute("from", vectorToString(this.rots[3]));
        animr1.setAttribute("to", vectorToString(this.rots[0]));
        animr2.setAttribute("from", vectorToString(this.rots[0]));
        animr2.setAttribute("to", vectorToString(this.rots[1]));
        animr3.setAttribute("from", vectorToString(this.rots[1]));
        animr3.setAttribute("to", vectorToString(this.rots[2]));
        animr4.setAttribute("from", vectorToString(this.rots[2]));

        anim1.setAttribute("begin", "a");
        anim2.setAttribute("begin", "b");
        anim3.setAttribute("begin", "c");
        anim4.setAttribute("begin", "d");

        animr1.setAttribute("begin", "ar");
        animr2.setAttribute("begin", "br");
        animr3.setAttribute("begin", "cr");
        animr4.setAttribute("begin", "dr");

        anims.forEach(function (element) {
            element.setAttribute("attribute", "position");
        });
        animr.forEach(function (element) {
            element.setAttribute("attribute", "rotation");
            element.setAttribute("dur", "300");
        });

        console.log(anims);

        this.el.appendChild(anim1);
        this.el.appendChild(anim2);
        this.el.appendChild(anim3);
        this.el.appendChild(anim4);
        this.el.appendChild(animr1);
        this.el.appendChild(animr2);
        this.el.appendChild(animr3);
        this.el.appendChild(animr4);

    },

    tick: function (notUsed, timeDelta) {
        // let temp = this.el.getAttribute("position");
        // let helperVec = new THREE.Vector3(temp.x, temp.y, temp.z);
        // let origin = (new THREE.Vector3()).copy(helperVec);
        // switch (this.animTimeFrame[0]) {
        //     case "12":
        //         if (helperVec == this.points[1]) this.animTimeFrame = ["23", this.time23];
        //         else {
        //             helperVec.sub(this.points[1]).divideScalar(this.data.speed*1000);
        //             this.el.setAttribute("position", vectorToString(origin.add(helperVec)));
        //         }
        //         break;
        //     case "23":
        //         if (helperVec == this.points[2]) this.animTimeFrame = ["34", this.time34];
        //         else {
        //             helperVec.sub(this.points[2]).divideScalar(this.data.speed*1000);
        //             this.el.setAttribute("position", vectorToString(origin.add(helperVec)));
        //         }
        //         break;
        //     case "34":
        //         if (helperVec == this.points[3]) this.animTimeFrame = ["41", this.time41];
        //         else {
        //             helperVec.sub(this.points[3]).divideScalar(this.data.speed*1000);
        //             this.el.setAttribute("position", vectorToString(origin.add(helperVec)));
        //         }
        //         break;
        //     case "41":
        //         if (helperVec == this.points[0]) this.animTimeFrame = ["12", this.time12];
        //         else {
        //             helperVec.sub(this.points[0]).divideScalar(this.data.speed*1000);
        //             this.el.setAttribute("position", vectorToString(origin.add(helperVec)));
        //         }
        //         break;
        // }

        let pos = this.el.getAttribute("position");
        let rot = this.el.getAttribute("rotation");

        switch (this.animTimeFrame[0]) {
            case "12":
                if (compareVectors(pos, this.points[0])) {
                    console.log("arrived at a");
                    console.log("comparing r to r1");
                    if (compareVectors(rot, this.rots[0])) {
                        console.log("traveling from a to b");
                        this.el.emit("a");
                        this.animTimeFrame = ["23", this.time23];
                        this.rotated = false;
                    } else if (!this.rotated) {
                        console.log("changing to r1");
                        this.el.emit("ar");
                        this.rotated = true;
                    }
                }
                break;
            case "23":
                if (compareVectors(pos, this.points[1])) {
                    console.log("arrived at b");
                    console.log("comparing r to r2");
                    if (compareVectors(rot, this.rots[1])) {
                        console.log("travelling from b to c");
                        this.el.emit("b");
                        this.animTimeFrame = ["34", this.time34];
                        this.rotated = false;
                    } else if (!this.rotated) {
                        console.log("changing to r2");
                        this.el.emit("br");
                        this.rotated = true;
                    }
                }
                break;
            case "34":
                if (compareVectors(pos, this.points[2])) {
                    if (compareVectors(rot, this.rots[2])) {
                        this.el.emit("c");
                        this.animTimeFrame = ["41", this.time41];
                        this.rotated = false;
                    } else if (!this.rotated) {
                        this.el.emit("cr");
                        this.rotated = true;
                    }
                }
                break;
            case "41":
                if (compareVectors(pos, this.points[3])) {
                    if (compareVectors(rot, this.rots[3])) {
                        this.el.emit("d");
                        this.animTimeFrame = ["12", this.time12];
                        this.rotated = false;
                    } else if (!this.rotated) {
                        this.el.emit("dr");
                        this.rotated = true;
                    }
                }
                break;
        }


        // console.log(this.time);
        // if (this.el.getAttribute("position").x == NaN) return;
        // timeDelta = Math.floor(timeDelta);
        // if (this.time >= this.animTimeFrame[1]) {
        //     console.log("triggered animation");
        //     console.log(this.animTimeFrame);


        //     this.rotated = false;
        //     this.time = 0;
        //     console.log(this.animTimeFrame);
        // } else {
        //     if (!this.rotated && this.time >= (7*this.animTimeFrame[1]/8)) {
        //         switch (this.animTimeFrame[0]) {
        //             case "12":
        //                 this.el.emit("ar");
        //                 break;
        //             case "23":
        //                 this.el.emit("br");
        //                 break;
        //             case "34":
        //                 this.el.emit("cr");
        //                 break;
        //             case "41":
        //                 this.el.emit("dr");
        //                 break;
        //         }
        //         this.rotated = true;
        //     }
        //     this.time = this.time + 1;
        // }
    }
});