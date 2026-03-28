import * as THREE from "three";
import gsap from "gsap";

export class BoxModel {
    constructor() {
        this.black = new THREE.MeshStandardMaterial({
            color: "#2a2a2a",
            roughness: 0.62,
            metalness: 0.1,
        })

        this.metal = new THREE.MeshStandardMaterial({
            color: "#a4a4a4",
            roughness: 0.18,
            metalness: 0.35,
        })

        this.glow = new THREE.MeshStandardMaterial({
            color: "#00cfff",
            emissive: "#00cfff",
            emissiveIntensity: 1.2,
            roughness: 0.2,
            metalness: 0,
        })

        this.BOX_WIDTH = 1.1
        this.BOX_TOTAL_HEIGHT = 0.7
        this.BOX_DEPTH = 1.0
        this.BOX_THICKNESS = 0.04
        this.COVER_HEIGHT = this.BOX_TOTAL_HEIGHT * 0.34
        this.BOX_BODY_HEIGHT = this.BOX_TOTAL_HEIGHT - this.COVER_HEIGHT

        this.chest = new THREE.Group()
        this.body = new THREE.Group()
        this.coverPivot = new THREE.Group()
        this.innerCore = null
        this.pointLight = null

        this.create();
    }

    addItem(parent, geometry, material, x, y, z, castShadow = true, receiveShadow = true) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
        mesh.castShadow = castShadow
        mesh.receiveShadow = receiveShadow
        parent.add(mesh)
        return mesh
    }

    create() {
        this.pointLight = new THREE.PointLight("#00cfff", 0.8, 2.5)
        this.pointLight.position.set(0, this.BOX_THICKNESS + this.BOX_BODY_HEIGHT / 2, 0)
        this.chest.add(this.pointLight)

        this.addItem(
            this.body,
            new THREE.BoxGeometry(this.BOX_WIDTH, this.BOX_THICKNESS, this.BOX_DEPTH),
            this.black,
            0,
            this.BOX_THICKNESS / 2,
            0
        )

        this.addItem(
            this.body,
            new THREE.BoxGeometry(this.BOX_WIDTH, this.BOX_BODY_HEIGHT, this.BOX_THICKNESS),
            this.black,
            0,
            this.BOX_THICKNESS + this.BOX_BODY_HEIGHT / 2,
            this.BOX_DEPTH / 2 - this.BOX_THICKNESS / 2
        )

        this.addItem(
            this.body,
            new THREE.BoxGeometry(this.BOX_WIDTH, this.BOX_BODY_HEIGHT, this.BOX_THICKNESS),
            this.black,
            0,
            this.BOX_THICKNESS + this.BOX_BODY_HEIGHT / 2,
            -this.BOX_DEPTH / 2 + this.BOX_THICKNESS / 2
        )

        this.addItem(
            this.body,
            new THREE.BoxGeometry(this.BOX_THICKNESS, this.BOX_BODY_HEIGHT, this.BOX_DEPTH - this.BOX_THICKNESS * 2),
            this.black,
            -this.BOX_WIDTH / 2 + this.BOX_THICKNESS / 2,
            this.BOX_THICKNESS + this.BOX_BODY_HEIGHT / 2,
            0
        )

        this.addItem(
            this.body,
            new THREE.BoxGeometry(this.BOX_THICKNESS, this.BOX_BODY_HEIGHT, this.BOX_DEPTH - this.BOX_THICKNESS * 2),
            this.black,
            this.BOX_WIDTH / 2 - this.BOX_THICKNESS / 2,
            this.BOX_THICKNESS + this.BOX_BODY_HEIGHT / 2,
            0
        )

        const trimY = this.BOX_THICKNESS + this.BOX_BODY_HEIGHT + 0.008

        this.addItem(this.body, new THREE.BoxGeometry(this.BOX_WIDTH + 0.01, 0.015, 0.012), this.metal, 0, trimY, this.BOX_DEPTH / 2)
        this.addItem(this.body, new THREE.BoxGeometry(this.BOX_WIDTH + 0.01, 0.015, 0.012), this.metal, 0, trimY, -this.BOX_DEPTH / 2)
        this.addItem(this.body, new THREE.BoxGeometry(0.012, 0.015, this.BOX_DEPTH + 0.01), this.metal, -this.BOX_WIDTH / 2, trimY, 0)
        this.addItem(this.body, new THREE.BoxGeometry(0.012, 0.015, this.BOX_DEPTH + 0.01), this.metal, this.BOX_WIDTH / 2, trimY, 0)
        this.addItem(this.body, new THREE.BoxGeometry(this.BOX_WIDTH * 0.58, 0.012, 0.012),
            new THREE.MeshStandardMaterial({
                color: "#b700ff",
                emissive: "#cf00ff",
                emissiveIntensity: 2.5,
                roughness: 0.25,
                metalness: 0.35,
            }),
            0, this.BOX_THICKNESS + this.BOX_BODY_HEIGHT * 0.88, this.BOX_DEPTH / 2 + 0.012)

        this.innerCore = this.addItem(this.body, new THREE.BoxGeometry(this.BOX_WIDTH - this.BOX_THICKNESS * 2.2,
                this.BOX_BODY_HEIGHT - this.BOX_THICKNESS * 1.2, this.BOX_DEPTH - this.BOX_THICKNESS * 2.2),
            this.glow, 0, this.BOX_THICKNESS + (this.BOX_BODY_HEIGHT - this.BOX_THICKNESS * 1.2) / 2, 0,
            false, false);


        this.createCover()
        this.chest.add(this.body, this.coverPivot)
        this.chest.position.y = -0.9
    }

    createCover() {
        this.coverPivot.position.set(
            0,
            this.BOX_THICKNESS + this.BOX_BODY_HEIGHT,
            -this.BOX_DEPTH / 2 + this.BOX_THICKNESS / 2
        )

        const cover = new THREE.Group()

        this.addItem(cover, new THREE.BoxGeometry(this.BOX_WIDTH, this.BOX_THICKNESS, this.BOX_DEPTH),
            this.black, 0, this.COVER_HEIGHT - this.BOX_THICKNESS / 2, this.BOX_DEPTH / 2 - this.BOX_THICKNESS / 2)
        this.addItem(cover, new THREE.BoxGeometry(this.BOX_WIDTH, this.COVER_HEIGHT, this.BOX_THICKNESS),
            this.black, 0, this.COVER_HEIGHT / 2, this.BOX_DEPTH - this.BOX_THICKNESS - this.BOX_THICKNESS / 2)
        this.addItem(cover, new THREE.BoxGeometry(this.BOX_WIDTH, this.COVER_HEIGHT, this.BOX_THICKNESS),
            this.black, 0, this.COVER_HEIGHT / 2, -this.BOX_THICKNESS / 2)
        this.addItem(cover, new THREE.BoxGeometry(this.BOX_THICKNESS, this.COVER_HEIGHT,
            this.BOX_DEPTH - this.BOX_THICKNESS * 2), this.black, -this.BOX_WIDTH / 2 + this.BOX_THICKNESS / 2,
            this.COVER_HEIGHT / 2, this.BOX_DEPTH / 2 - this.BOX_THICKNESS / 2)
        this.addItem(cover, new THREE.BoxGeometry(this.BOX_THICKNESS, this.COVER_HEIGHT, this.BOX_DEPTH - this.BOX_THICKNESS * 2),
            this.black, this.BOX_WIDTH / 2 - this.BOX_THICKNESS / 2, this.COVER_HEIGHT / 2, this.BOX_DEPTH / 2 - this.BOX_THICKNESS / 2)
        this.coverPivot.add(cover)
    }

    getChest() {
        return this.chest
    }

    open() {
        gsap.to(this.coverPivot.rotation, {
            x: -Math.PI * 0.72,
            duration: 3,
            ease: "power2.inOut",
        })

        gsap.to(this.innerCore.material, {
            emissiveIntensity: 3.2,
            duration: 0.35,
            ease: "power2.out",
        })

        gsap.to(this.pointLight, {
            intensity: 6,
            duration: 0.35,
            ease: "power2.out",
        })
    }

    setOpen() {
        this.coverPivot.rotation.x = -Math.PI * 0.72;
        this.innerCore.material.emissiveIntensity = 3.2;
        this.pointLight.position.intensity = 6
    }

    close() {
        gsap.to(this.coverPivot.rotation, {
            x:  0,
            duration: 0.85,
            ease: "power2.inOut",
        })

        gsap.to(this.innerCore.material, {
            emissiveIntensity: 2,
            duration: 0.35,
            ease: "power2.out",
        })

        gsap.to(this.pointLight, {
            intensity: 1.2,
            duration: 0.35,
            ease: "power2.out",
        })
    }

}