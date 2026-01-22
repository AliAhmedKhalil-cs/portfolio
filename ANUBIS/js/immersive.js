/**
 * Egypt Eternal - Immersive 3D Museum Experience
 * Three.js WebGL-based Virtual Museum
 */

class ImmersiveExperience {
  constructor() {
    this.container = document.getElementById('immersive-container');
    if (!container) return;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    this.init();
  }

  init() {
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x0a0a0a, 1);
    this.container.appendChild(this.renderer.domElement);

    // Setup lighting
    this.setupLighting();
    
    // Create museum environment
    this.createMuseumHall();
    this.createDisplayCases();
    this.createHotspots();
    
    // Camera positioning
    this.camera.position.set(0, 1.8, 0);
    this.camera.lookAt(0, 1.5, -5);

    // Input handling
    this.setupControls();
    this.setupMobile();
    
    // Animation loop
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupLighting() {
    // Ambient light (golden tone)
    const ambient = new THREE.AmbientLight(0xffd700, 0.6);
    this.scene.add(ambient);

    // Directional light (spotlight effect)
    const directional = new THREE.DirectionalLight(0xffff99, 0.8);
    directional.position.set(5, 10, 5);
    this.scene.add(directional);

    // Hemisphere light for better depth
    const hemisphere = new THREE.HemisphereLight(0xd4af37, 0x1a1a1a, 0.4);
    this.scene.add(hemisphere);
  }

  createMuseumHall() {
    // Floor
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshLambertMaterial({ color: 0x3a3a3a });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Walls
    this.createWalls();
    
    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(40, 40);
    const ceilingMat = new THREE.MeshLambertMaterial({ color: 0x0a0a0a });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = 6;
    ceiling.rotation.x = Math.PI / 2;
    this.scene.add(ceiling);

    // Decorative columns
    this.createColumns();
  }

  createWalls() {
    const wallMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });

    // Front wall
    const frontWallGeo = new THREE.PlaneGeometry(40, 6);
    const frontWall = new THREE.Mesh(frontWallGeo, wallMat);
    frontWall.position.z = -20;
    frontWall.position.y = 3;
    this.scene.add(frontWall);

    // Back wall
    const backWallGeo = new THREE.PlaneGeometry(40, 6);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.z = 20;
    backWall.position.y = 3;
    backWall.rotation.y = Math.PI;
    this.scene.add(backWall);

    // Left wall
    const leftWallGeo = new THREE.PlaneGeometry(40, 6);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.x = -20;
    leftWall.position.y = 3;
    leftWall.rotation.y = Math.PI / 2;
    this.scene.add(leftWall);

    // Right wall
    const rightWallGeo = new THREE.PlaneGeometry(40, 6);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.position.x = 20;
    rightWall.position.y = 3;
    rightWall.rotation.y = -Math.PI / 2;
    this.scene.add(rightWall);
  }

  createColumns() {
    const columnPositions = [
      [-10, 0, -10], [10, 0, -10],
      [-10, 0, 0], [10, 0, 0],
      [-10, 0, 10], [10, 0, 10]
    ];

    columnPositions.forEach(pos => {
      const colGeo = new THREE.CylinderGeometry(0.5, 0.5, 6, 32);
      const colMat = new THREE.MeshLambertMaterial({ color: 0xd4af37 });
      const column = new THREE.Mesh(colGeo, colMat);
      column.position.set(...pos);
      column.position.y = 3;
      this.scene.add(column);
    });
  }

  createDisplayCases() {
    const casesData = [
      { name: 'Grand Hall', pos: [0, 1, -8] },
      { name: 'Grand Stairs', pos: [0, 1, 0] },
      { name: 'Tutankhamun', pos: [0, 1, 8] },
      { name: 'Khufu\'s Boats', pos: [-8, 1, -8] },
      { name: 'Royal Artifacts', pos: [8, 1, -8] },
      { name: 'Hieroglyphics', pos: [-8, 1, 8] }
    ];

    this.hotspots = [];

    casesData.forEach(caseData => {
      const caseGeo = new THREE.BoxGeometry(3, 2, 3);
      const caseMat = new THREE.MeshLambertMaterial({ color: 0xb8860b });
      const caseObj = new THREE.Mesh(caseGeo, caseMat);
      caseObj.position.set(...caseData.pos);
      this.scene.add(caseObj);

      // Create glowing hotspot
      const spotGeo = new THREE.SphereGeometry(0.3, 32, 32);
      const spotMat = new THREE.MeshBasicMaterial({ 
        color: 0xffd700,
        emissive: 0xffff99
      });
      const hotspot = new THREE.Mesh(spotGeo, spotMat);
      hotspot.position.set(...caseData.pos);
      hotspot.position.y += 1.5;
      hotspot.userData.label = caseData.name;
      hotspot.userData.pulseScale = 1;
      this.scene.add(hotspot);
      this.hotspots.push(hotspot);
    });
  }

  createHotspots() {
    // Hotspots already created in createDisplayCases
    // This method can be expanded for additional interactivity
  }

  setupControls() {
    this.keys = {};
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    
    // Mouse look
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e), false);
  }

  setupMobile() {
    // Touch controls for mobile
    this.touchStartX = 0;
    this.touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
      const deltaX = e.touches[0].clientX - this.touchStartX;
      const deltaY = e.touches[0].clientY - this.touchStartY;
      
      this.camera.position.x -= deltaX * 0.01;
      this.camera.position.z -= deltaY * 0.01;
    });
  }

  handleKeyDown(e) {
    this.keys[e.key.toLowerCase()] = true;
  }

  handleKeyUp(e) {
    this.keys[e.key.toLowerCase()] = false;
  }

  handleMouseMove(e) {
    // Can implement mouse look here
  }

  updateCameraPosition() {
    const speed = 0.1;
    
    if (this.keys['w'] || this.keys['arrowup']) {
      this.camera.position.z -= speed;
    }
    if (this.keys['s'] || this.keys['arrowdown']) {
      this.camera.position.z += speed;
    }
    if (this.keys['a'] || this.keys['arrowleft']) {
      this.camera.position.x -= speed;
    }
    if (this.keys['d'] || this.keys['arrowright']) {
      this.camera.position.x += speed;
    }
    if (this.keys[' ']) {
      this.camera.position.y += speed;
    }
    if (this.keys['shift']) {
      this.camera.position.y -= speed;
    }

    // Boundary checking
    this.camera.position.x = Math.max(-18, Math.min(18, this.camera.position.x));
    this.camera.position.z = Math.max(-18, Math.min(18, this.camera.position.z));
    this.camera.position.y = Math.max(0.5, Math.min(5, this.camera.position.y));
  }

  updateHotspots() {
    this.hotspots?.forEach(hotspot => {
      // Pulsing animation
      hotspot.userData.pulseScale += 0.02;
      const pulse = Math.sin(hotspot.userData.pulseScale) * 0.5 + 1;
      hotspot.scale.set(pulse, pulse, pulse);
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.updateCameraPosition();
    this.updateHotspots();

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImmersiveExperience;
}
