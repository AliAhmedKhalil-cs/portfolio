/**
 * ANUBIS MUSEUM - Pannellum 360° Panorama Viewer
 * Initializes sacred panorama spaces with hotspots and judgment knowledge
 */

class AnubisPanoramaViewer {
    constructor() {
        this.viewer = null;
        this.currentScene = 'karnak-hypostyle';
        this.init();
    }

    init() {
        this.initializePannellum();
    }

    initializePannellum() {
        // Using placeholder gradient panorama (since we don't have actual 360 images)
        // In production, replace with real panorama URLs
        
        const panoramaConfig = {
            "default": {
                "firstScene": "karnak-hypostyle",
                "sceneFadeDuration": 1000,
                "sceneInactivityTimeout": 0,
                "hfov": 100,
                "minHfov": 50,
                "maxHfov": 150,
                "autoRotate": -0.5, // Slow automatic rotation (guardian presence)
                "autoRotateInactivityDelay": 5000,
                "showControls": true,
                "mouseZoom": true,
                "gyroOverride": true,
                "disableKeyboardCtrl": false,
                "controlsArea": [
                    "bottom",
                    "left",
                    "right"
                ]
            },
            "scenes": {
                "karnak-hypostyle": {
                    "title": "Karnak Hypostyle Hall",
                    "title_ar": "قاعة الأعمدة الضخمة بالكرنك",
                    "type": "equirectangular",
                    // Using gradient placeholder - replace with actual panorama URL in production
                    "panorama": this.createPlaceholderPanorama(),
                    "pitch": 0,
                    "yaw": 0,
                    "hfov": 100,
                    "hotSpots": [
                        {
                            "pitch": -5,
                            "yaw": 45,
                            "type": "info",
                            "text": "The Central Sanctuary<br><em>Heart of Divine Power</em>",
                            "text_ar": "الحرم المركزي<br><em>قلب القوة الإلهية</em>",
                            "id": "hotspot-sanctuary"
                        },
                        {
                            "pitch": 15,
                            "yaw": -30,
                            "type": "info",
                            "text": "Column of Thoth<br><em>Wisdom Keeper</em>",
                            "text_ar": "عمود تحوت<br><em>حارس الحكمة</em>",
                            "id": "hotspot-thoth"
                        },
                        {
                            "pitch": -10,
                            "yaw": 150,
                            "type": "info",
                            "text": "Pharaoh's Throne<br><em>Seat of Authority</em>",
                            "text_ar": "عرش الفرعون<br><em>مقعد السلطة</em>",
                            "id": "hotspot-throne"
                        },
                        {
                            "pitch": 20,
                            "yaw": -120,
                            "type": "info",
                            "text": "Sacred Altar<br><em>Where Offerings Were Made</em>",
                            "text_ar": "المذبح المقدس<br><em>حيث قدمت القرابين</em>",
                            "id": "hotspot-altar"
                        },
                        {
                            "pitch": 0,
                            "yaw": 180,
                            "type": "info",
                            "text": "Anubis's Judgment Chamber<br><em>The Scales of Ma'at</em>",
                            "text_ar": "حجرة حكم أنوبيس<br><em>موازين ماعت</em>",
                            "id": "hotspot-judgment",
                            "cssClass": "hotspot-judgment"
                        }
                    ]
                },
                "gem-grand-hall": {
                    "title": "Grand Egyptian Museum - Grand Hall",
                    "title_ar": "المتحف المصري الكبير - القاعة الكبرى",
                    "type": "equirectangular",
                    "panorama": this.createPlaceholderPanorama('#1a1a1a'),
                    "pitch": 0,
                    "yaw": 0,
                    "hfov": 100,
                    "hotSpots": [
                        {
                            "pitch": -15,
                            "yaw": 0,
                            "type": "info",
                            "text": "Tutankhamun's Mask<br><em>The Boy King's Glory</em>",
                            "text_ar": "قناع توت عنخ آمون<br><em>مجد الملك الصبي</em>",
                            "id": "hotspot-tutankhamun"
                        },
                        {
                            "pitch": 10,
                            "yaw": 90,
                            "type": "info",
                            "text": "Ramesses II Statue<br><em>The Great Builder</em>",
                            "text_ar": "تمثال رمسيس الثاني<br><em>الباني الأعظم</em>",
                            "id": "hotspot-ramesses"
                        },
                        {
                            "pitch": -5,
                            "yaw": 200,
                            "type": "info",
                            "text": "Canopic Jars<br><em>Guardians of the Afterlife</em>",
                            "text_ar": "جرار كانوبية<br><em>حراس الحياة الآخرة</em>",
                            "id": "hotspot-canopic"
                        }
                    ]
                }
            }
        };

        // Initialize Pannellum viewer
        this.viewer = pannellum.viewer('panorama', panoramaConfig);

        // Add event listeners
        this.viewer.on('load', () => this.onPanoramaLoaded());
        this.viewer.on('error', (error) => this.onPanoramaError(error));

        // Custom styling for hotspots
        this.setupHotspotStyling();
    }

    createPlaceholderPanorama(color = '#0d0d0d') {
        /**
         * Creates a fallback gradient canvas panorama
         * This ensures the viewer works even without actual panorama images
         * In production, replace with real equirectangular panorama URLs
         */
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 1024;

        const ctx = canvas.getContext('2d');

        // Create museum-grade gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.3, '#1a1a1a');
        gradient.addColorStop(0.5, '#0f0f0f');
        gradient.addColorStop(0.7, '#1a1a1a');
        gradient.addColorStop(1, color);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle texturing
        ctx.fillStyle = 'rgba(212, 175, 55, 0.05)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 100 + 50;
            ctx.fillRect(x, y, size, 2);
        }

        // Add center spotlight (simulating museum lighting)
        const radialGrad = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            200,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width
        );
        radialGrad.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
        radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw hieroglyphic-inspired patterns
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
            const x = (i * canvas.width) / 10;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.quadraticCurveTo(x + 100, canvas.height / 2, x, canvas.height);
            ctx.stroke();
        }

        return canvas.toDataURL('image/png');
    }

    onPanoramaLoaded() {
        console.log('✓ Sacred panorama loaded. Anubis stands guard.');
        
        // Add sacred presence indicator
        const indicator = document.querySelector('.immersive__loading');
        if (indicator) {
            indicator.style.display = 'none';
        }

        // Initialize hotspot interactivity
        this.setupHotspotEvents();
    }

    onPanoramaError(error) {
        console.error('✗ Panorama loading error:', error);
        
        // Fallback: Show error message with graceful degradation
        const container = document.getElementById('panorama');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'panorama-error';
            errorDiv.innerHTML = `
                <div style="color: #d4af37; text-align: center; padding: 60px; font-size: 18px;">
                    <h3>The panorama viewer encountered an issue.</h3>
                    <p>Please refresh the page or check your internet connection.</p>
                    <p style="font-size: 14px; margin-top: 20px; opacity: 0.7;">
                        Explore the sacred artifacts below to continue your journey with Anubis.
                    </p>
                </div>
            `;
            container.appendChild(errorDiv);
        }
    }

    setupHotspotStyling() {
        /**
         * Custom CSS for hotspot elements
         * Applied dynamically to ensure Pannellum hotspots match our design system
         */
        const style = document.createElement('style');
        style.textContent = `
            .pnlm-hotspot {
                background: radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.8), rgba(180, 140, 40, 0.4)) !important;
                border: 2px solid var(--color-antique-gold) !important;
                box-shadow: 0 0 20px rgba(212, 175, 55, 0.6), inset 0 0 10px rgba(255, 215, 0, 0.3) !important;
            }
            
            .pnlm-hotspot:hover {
                background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 1), rgba(212, 175, 55, 0.8)) !important;
                box-shadow: 0 0 50px rgba(212, 175, 55, 1), inset 0 0 20px rgba(255, 215, 0, 0.6) !important;
            }
            
            .hotspot-judgment {
                width: 80px !important;
                height: 80px !important;
                background: radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 1), rgba(180, 140, 40, 0.6)) !important;
                box-shadow: 0 0 40px rgba(212, 175, 55, 0.9), inset 0 0 15px rgba(255, 215, 0, 0.5) !important;
                animation: hotspotPulse 2s ease-in-out infinite !important;
            }
            
            @keyframes hotspotPulse {
                0%, 100% { 
                    box-shadow: 0 0 30px rgba(212, 175, 55, 0.7), inset 0 0 10px rgba(255, 215, 0, 0.3) !important;
                    transform: scale(1) !important;
                }
                50% { 
                    box-shadow: 0 0 50px rgba(212, 175, 55, 1), inset 0 0 20px rgba(255, 215, 0, 0.6) !important;
                    transform: scale(1.15) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupHotspotEvents() {
        /**
         * Attach click handlers to hotspots
         * Opens cartouche-style modals with story content
         */
        const hotspots = document.querySelectorAll('.pnlm-hotspot');
        
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('click', (e) => {
                const id = hotspot.id;
                this.openHotspotModal(id);
            });

            // Improve visibility
            hotspot.style.width = '50px';
            hotspot.style.height = '50px';
            hotspot.style.borderRadius = '50%';
        });
    }

    openHotspotModal(hotspotId) {
        /**
         * Open cartouche-style modal with hotspot knowledge
         */
        const hotspotData = {
            'hotspot-sanctuary': {
                title: 'The Central Sanctuary',
                title_ar: 'الحرم المركزي',
                content: 'Here, pharaohs made offerings to Amun-Ra. The air still carries the scent of incense from rituals performed 3,000 years ago.',
                content_ar: 'هنا قدم الفراعنة القرابين لآمون رع. الهواء لا يزال يحمل رائحة البخور من الطقوس التي أقيمت منذ 3000 سنة.'
            },
            'hotspot-thoth': {
                title: 'Column of Thoth',
                title_ar: 'عمود تحوت',
                content: 'Thoth, god of wisdom and writing, was honored here. Scribes consulted this column before writing sacred texts.',
                content_ar: 'تم تكريم تحوت إله الحكمة والكتابة هنا. استشار الكتبة هذا العمود قبل كتابة النصوص المقدسة.'
            },
            'hotspot-throne': {
                title: 'Pharaoh\'s Throne',
                title_ar: 'عرش الفرعون',
                content: 'Only the divine ruler could sit here. From this throne, pharaohs decreed the laws of Egypt and judged the kingdom.',
                content_ar: 'فقط الحاكم الإلهي يمكن أن يجلس هنا. من هذا العرش، أصدر الفراعنة قوانين مصر وحكموا المملكة.'
            },
            'hotspot-altar': {
                title: 'Sacred Altar',
                title_ar: 'المذبح المقدس',
                content: 'Upon this altar, priests made daily offerings of bread, beer, and meat to sustain the gods\' eternal power.',
                content_ar: 'على هذا المذبح، قدم الكهنة القرابين اليومية من الخبز والبيرة واللحم لدعم القوة الأبدية للآلهة.'
            },
            'hotspot-judgment': {
                title: 'Chamber of Anubis - The Scales of Ma\'at',
                title_ar: 'حجرة أنوبيس - موازين ماعت',
                content: 'Here, Anubis weighs the hearts of the deceased against the feather of truth. Only the righteous ascend to the eternal paradise.',
                content_ar: 'هنا، يزن أنوبيس قلوب المتوفين ضد ريشة الحقيقة. فقط الأتقياء يصعدون إلى الجنة الأبدية.'
            },
            'hotspot-tutankhamun': {
                title: 'Tutankhamun\'s Golden Mask',
                title_ar: 'قناع توت عنخ آمون الذهبي',
                content: 'The boy king\'s tomb was discovered in 1922, nearly intact. His mask reveals the face of a pharaoh who ruled at just 9 years old.',
                content_ar: 'تم اكتشاف قبر الملك الصبي عام 1922 بحالة سليمة تقريباً. تكشف قناعه عن وجه فرعون حكم في سن 9 سنوات فقط.'
            },
            'hotspot-ramesses': {
                title: 'Ramesses II - The Great Builder',
                title_ar: 'رمسيس الثاني - الباني الأعظم',
                content: 'Ramesses II reigned for 66 years and built more monuments than any pharaoh before him. His legacy shaped Egypt for millennia.',
                content_ar: 'حكم رمسيس الثاني لمدة 66 سنة وبنى أكثر من أي فرعون قبله. تركه الإرث شكل مصر لآلاف السنين.'
            },
            'hotspot-canopic': {
                title: 'Canopic Jars - Guardians of Eternity',
                title_ar: 'الجرار الكانوبية - حراس الأبدية',
                content: 'These jars held the organs of the mummified dead. Each jar was guarded by a different god, ensuring eternal protection.',
                content_ar: 'احتفظت هذه الجرار بأعضاء الموتى المحنطين. حرس كل جرة إله مختلف، مما يضمن الحماية الأبدية.'
            }
        };

        const data = hotspotData[hotspotId];
        if (!data) return;

        // Create and display modal
        this.showKnowledgeModal(data);
    }

    showKnowledgeModal(data) {
        /**
         * Display cartouche-style modal with hotspot knowledge
         */
        let existingModal = document.getElementById('knowledge-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'knowledge-modal';
        modal.className = 'knowledge-modal';
        modal.innerHTML = `
            <div class="knowledge-modal__overlay"></div>
            <div class="knowledge-modal__content">
                <svg class="knowledge-modal__cartouche-bg" viewBox="0 0 400 500" aria-hidden="true" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="cartoucheFill" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1"/>
                            <stop offset="100%" style="stop-color:#0d0d0d;stop-opacity:1"/>
                        </linearGradient>
                    </defs>
                    <rect x="20" y="20" width="360" height="460" rx="20" ry="20" fill="url(#cartoucheFill)" stroke="#d4af37" stroke-width="2"/>
                    <ellipse cx="200" cy="30" rx="80" ry="15" fill="url(#cartoucheFill)" stroke="#d4af37" stroke-width="2"/>
                </svg>
                <button class="knowledge-modal__close" aria-label="Close modal">&times;</button>
                <h2 class="knowledge-modal__title" data-en="${data.title}" data-ar="${data.title_ar}">${data.title}</h2>
                <p class="knowledge-modal__text" data-en="${data.content}" data-ar="${data.content_ar}">${data.content}</p>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styling
        const style = document.createElement('style');
        style.textContent = `
            .knowledge-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.4s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .knowledge-modal__overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }

            .knowledge-modal__content {
                position: relative;
                z-index: 10;
                max-width: 500px;
                width: 90%;
                background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
                border: 2px solid #d4af37;
                border-radius: 20px;
                padding: 50px 40px;
                box-shadow: 0 0 50px rgba(212, 175, 55, 0.4), 0 20px 60px rgba(0, 0, 0, 0.8);
                text-align: center;
                animation: slideUp 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
            }

            @keyframes slideUp {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .knowledge-modal__cartouche-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .knowledge-modal__close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: #d4af37;
                font-size: 2rem;
                cursor: pointer;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                z-index: 11;
            }

            .knowledge-modal__close:hover {
                color: #FFD700;
                transform: rotate(90deg) scale(1.2);
            }

            .knowledge-modal__title {
                position: relative;
                z-index: 2;
                font-size: 1.8rem;
                color: #d4af37;
                margin-bottom: 20px;
                text-transform: uppercase;
                letter-spacing: 2px;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
            }

            .knowledge-modal__text {
                position: relative;
                z-index: 2;
                color: #f5f0e6;
                font-size: 1rem;
                line-height: 1.8;
                opacity: 0.95;
            }
        `;
        document.head.appendChild(style);

        // Close modal events
        const overlay = modal.querySelector('.knowledge-modal__overlay');
        const closeBtn = modal.querySelector('.knowledge-modal__close');

        overlay.addEventListener('click', () => modal.remove());
        closeBtn.addEventListener('click', () => modal.remove());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('knowledge-modal')) {
                modal.remove();
            }
        });
    }
}

// Initialize panorama viewer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AnubisPanoramaViewer();
});
