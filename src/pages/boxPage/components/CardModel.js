import * as THREE from "three";
import {RarityColor} from "./RarityColor";

export class CardModel {
    constructor(canvas, title, rarity, imageUrl, price = "00.99$") {
        this.model = null;
        this.rarity = rarity;

        canvas.width = 256;
        canvas.height = 512;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Canvas 2D context introuvable");
        }

        const texture = new THREE.CanvasTexture(canvas);

        const image = new Image();
        image.crossOrigin = "anonymous"
        image.src = imageUrl;

        image.onload = () => {
            this.drawFront(ctx, canvas, title, price, rarity, image);
            texture.needsUpdate = true;
        };
        image.onerror = () => {
            this.drawFront(ctx, canvas, title, price, rarity, null);
            texture.needsUpdate = true;
        };

        // au cas où l'image n'est pas encore chargée, on affiche déjà le fond + texte
        this.drawFront(ctx, canvas, title, price, rarity, null);
        texture.needsUpdate = true;

        const frontMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        });

        const sideColor = new THREE.Color(RarityColor[rarity.toUpperCase()].getBackground(ctx,canvas)).multiplyScalar(0.7);
        const sideMaterial = new THREE.MeshBasicMaterial({ color: sideColor });
        const backMaterial = new THREE.MeshBasicMaterial({ color: sideColor });

        const materials = [
            sideMaterial,   // droite
            sideMaterial,   // gauche
            sideMaterial,   // haut
            sideMaterial,   // bas
            frontMaterial,  // avant
            backMaterial    // arrière
        ];

        const geometry = new THREE.BoxGeometry(130, 260, 1);
        this.model = new THREE.Mesh(geometry, materials);

        this.glow = this.createLegendaryGlow();
        this.model.add(this.glow);

        this.neonBorder = this.createNeonBorder("#00f0ff");
        this.model.add(this.neonBorder);
    }

    drawFront(ctx, canvas, title, price, rarity, image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // fond arrondi
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0, 0, canvas.width, canvas.height, 20);
        ctx.clip();

        ctx.fillStyle = RarityColor[rarity.toUpperCase()].getBackground(ctx, canvas);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        // zone intérieure blanche légère pour faire ressortir le contenu

        // titre
        ctx.fillStyle = RarityColor[rarity.toUpperCase()].getBadgeFont(ctx, canvas);
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "left";

        const lines = this.wrapText(ctx, title, 26, 26, 204, 30);
        let titleY = 46;
        lines.slice(0, 5).forEach(line => {
            ctx.fillText(line, 26, titleY);
            titleY += 30;
        });

        // image
        if (image) {
            const imgWidth = 150;
            const imgHeight = 150;
            const imgX = (canvas.width - imgWidth) / 2;
            const imgY = 150;
            ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
        }

        // prix
        ctx.fillStyle = RarityColor[rarity.toUpperCase()].getBadgeFont(ctx, canvas);
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${price}$`, canvas.width / 2, 350);


        const badgeWidth = 220;
        const badgeHeight = 60;
        const badgeX = (canvas.width - badgeWidth) / 2;
        const badgeY = canvas.height - 80;


        ctx.fillStyle = RarityColor[rarity.toUpperCase()].getBadgeBackground(ctx, canvas);
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 12);
        ctx.fill();


        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 12);
        ctx.stroke();


        ctx.fillStyle = RarityColor[rarity.toUpperCase()].getBadgeFont(ctx, canvas);
        ctx.font = "bold 32px Manrope";
        ctx.textAlign = "center";
        ctx.fillText(
            this.rarity,
            canvas.width / 2,
            badgeY + 44
        );
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(" ");
        const lines = [];
        let line = "";

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const testWidth = ctx.measureText(testLine).width;

            if (testWidth > maxWidth && n > 0) {
                lines.push(line.trim());
                line = words[n] + " ";
            } else {
                line = testLine;
            }
        }

        lines.push(line.trim());
        return lines;
    }



    createLegendaryGlow() {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = RarityColor[this.rarity.toUpperCase()
            ].getGlow(ctx, canvas);
        ctx.fillRect(0, 0, 512, 512);

        const material = new THREE.MeshBasicMaterial({
            map: new THREE.CanvasTexture(canvas),
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            opacity: 0.95
        });

        const geometry = new THREE.PlaneGeometry(260, 420);
        const glow = new THREE.Mesh(geometry, material);
        glow.position.z = -3;

        return glow;
    }

    getModel() {
        return this.model;
    }

    createNeonBorderTexture(color = "#00f0ff") {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 1024;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Canvas 2D context introuvable");
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = 30;
        const y = 30;
        const w = canvas.width - 60;
        const h = canvas.height - 60;
        const radius = 40;

        ctx.strokeStyle = color;
        ctx.lineWidth = 18;
        ctx.shadowColor = color;
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius);
        ctx.stroke();

        return new THREE.CanvasTexture(canvas);
    }

    createNeonBorder(color = "#00f0ff") {
        const texture = this.createNeonBorderTexture(color);

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });

        const geometry = new THREE.PlaneGeometry(138, 268);
        const border = new THREE.Mesh(geometry, material);

        border.position.z = 0.7;

        return border;
    }
}