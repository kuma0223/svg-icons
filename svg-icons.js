window.addEventListener("DOMContentLoaded", function() {
    //initialize
    document.querySelectorAll("svg").forEach(tar=>{
        setInnerSvg(tar)
    })
    //set listener
    const obs = new MutationObserver(records =>{
        records.forEach(rec => {
            if(rec.type == "childList"){
                rec.addedNodes.forEach(added => {
                    if(added.nodeType != 1) return
                    if(added.tagName.toUpperCase() == "SVG"){
                        setInnerSvg(added)
                    } else {
                        added.querySelectorAll("svg").forEach(svg => {
                            setInnerSvg(svg)
                        })
                    }
                })
            } else if(rec.type == "attributes"){
                setInnerSvg(rec.target)
            }
        })
    })
    obs.observe(document.body, {
        attributes: true,
        childList: true,
        subtree:true,
        attributeFilter:["yu-icon","size","x","y"],
    })
    //function
    function setInnerSvg(target){
        const key = target.getAttribute("yu-icon")
        if(!key) return
        let val = (key in YuSvgIcons) ? YuSvgIcons[key] : ""
        target.setAttribute('viewBox','0 0 200 200')
        target.style["fill"] = "currentColor"
        const size = target.getAttribute('size')
        if(size){
            target.setAttribute('width',size)
            target.setAttribute('height',size)
            target.style['width']=size+'px'
            target.style['height']=size+'px'
        }
        const x = Number(target.getAttribute('x') | 0);
        const y = Number(target.getAttribute('y') | 0);
        if(x!=0 || y!=0){
            val = `<g transform="translate(${x*2} ${y*2})">` + val.substring(3)
        }
        target.innerHTML = val
    }
})
var YuSvgIcons = {
'noting':'',
'barchart':`<g><path d="M10,90 L40,90 L40,180 L10,180 L10,90 Z"/><path d="M60,10 L90,10 L90,180 L60,180 L60,10 Z"/><path d="M110,40 L140,40 L140,180 L110,180 L110,40 Z"/><path d="M160,120 L190,120 L190,180 L160,180 L160,120 Z"/></g>`,
'bars':`<g><rect x="15" y="25"  height="30" width="170" rx="5" /><rect x="15" y="85"  height="30" width="170" rx="5" /><rect x="15" y="145" height="30" width="170" rx="5" /></g>`,
'bell':`<g><path d="M93.26,9.47 C93.26,9.47 89.10,17.05 89.10,17.05 C89.10,17.05 62.99,27.13 62.99,27.13 C59.69,38.98 51.26,69.05 46.13,87.27 C43.53,95.76 38.49,111.68 36.13,118.40 C32.38,128.39 26.89,138.88 23.98,141.96 C22.42,143.57 13.87,148.98 13.18,149.41 C13.18,149.41 100.20,149.54 100.20,149.54 C100.20,149.54 187.23,149.41 187.23,149.41 C185.66,148.41 179.64,144.63 179.27,144.38 C176.19,142.16 170.82,134.23 167.63,127.15 C161.65,113.67 142.47,45.22 137.42,27.13 C137.42,27.13 111.31,17.05 111.31,17.05 C111.31,17.05 107.15,9.47 107.15,9.47 C107.15,9.47 93.26,9.47 93.26,9.47 Z"/><path d="M100.21,162 C100.21,162 66.25,161.83 66.25,161.83 C67.17,164.15 70.08,171.54 71.17,173.49 C73.07,176.78 78.37,181.46 81.75,183.06 C84.80,184.46 92.58,186.27 96.32,186.58 C100.07,186.85 107.60,186.27 111.41,185.42 C115.50,184.46 122.01,181.46 124.38,179.43 C127.37,176.77 130.37,171.54 132.34,166.46 C132.87,165.12 133.78,162.80 134.17,161.83 C134.17,161.83 100.21,162 100.21,162 Z"/></g>`,
'bookmark':`<g><path d="M40,15 L160,15 L160,185 L100,135 L40,185 L40,15 Z"/></g>`,
'boots':`<g><path d="M20,14.50 L101.11,25.86 L90,95 L182,115 L170,185 L110,185 L60,155 L20,155 L20,14.50 Z"/><path d="M20,165 L60,165 L60,185 L20,185 L20,165 Z"/></g>`,
'bread':`<g><path d="M28.35,87.43 C28.35,87.43 -16.50,13.50 90.16,9.56 C183.45,12.06 199.62,47.21 173.49,92.21 C173.49,92.21 177.58,179.29 177.58,179.29 C177.58,179.29 179.63,190.90 169.73,190.22 C159.83,189.54 139.93,190.22 139.93,190.22 C99.72,180 78.06,178.89 29.90,189.19 C21.45,187.55 21.04,179.78 21.04,179.78 C21.04,179.78 28.35,87.43 28.35,87.43 M86.16,21.86 C0.63,24.39 43.71,84.58 43.08,87.74 C43.08,87.74 35.48,159.97 35.48,159.97 C33.26,177.70 47.51,172 47.51,172 C76.34,167.57 89.30,167.68 122.59,172 C141.73,177.41 136.68,157.91 136.68,157.91 C136.68,157.91 129.87,88.38 129.87,88.38 C129.87,88.38 172,23.12 86.16,21.86 Z" fill-rule="evenodd"/></g>`,
'brokenheart':`<g><path d="M101.26,187.81 C92.49,179.84 64.50,154.43 56.82,147.15 C50.43,140.80 38.30,127.80 34.24,122.80 C27.81,114.72 18.56,99.79 15.88,92.14 C13.72,85.84 12.29,70.95 12.93,64.89 C13.32,61.48 14.99,54.83 16.61,51.30 C18.34,47.64 23.04,41.30 26.22,38.32 C29.22,35.55 35.49,31.36 38.98,29.78 C42.32,28.30 49.93,26.88 53.65,26.76 C57.53,26.67 65.37,27.65 69.37,28.62 C73.09,29.54 80.02,32.22 82.51,33.67 C85.93,35.72 91.72,40.95 93.87,43.95 C95.49,46.23 99.06,52.60 100.69,56.03 C104.03,63.23 105.12,75.51 105.37,78.32 C105.37,78.32 85.34,99.74 85.34,99.74 C85.34,99.74 104.69,131.24 104.69,131.24 C104.69,131.24 91.58,142.77 91.58,142.77 C91.58,142.77 107.60,162.24 107.60,162.24 C107.60,162.24 101.26,187.81 101.26,187.81 Z"/><path d="M108.46,176.29 C108.46,176.29 117.50,162.17 117.50,162.17 C117.50,162.17 108.31,145.37 108.31,145.37 C108.31,145.37 123.64,133.10 123.64,133.10 C123.64,133.10 108.18,101.52 108.18,101.52 C108.18,101.52 121.04,82.76 121.04,82.76 C129.88,73.91 136.87,67.42 144.04,64.67 C147.76,63.29 155.78,62 159.62,62.26 C163.87,62.59 170.40,64.84 173.95,67.09 C177.33,69.30 183.25,75 185.06,78.37 C186.80,81.70 187.99,88.33 187.95,91.65 C187.90,94.54 186.93,100.76 186.01,104.19 C184.96,107.99 181.86,114.69 179.41,118.38 C174.71,125.38 162.21,137.64 155.98,142.73 C148.19,149.08 117.37,170.20 108.46,176.29 Z"/></g>`,
'calendar':`<g><path d="M55,98 L75,98 L75,118 L55,118 L55,98 Z"/><path d="M90,98 L110,98 L110,118 L90,118 L90,98 Z"/><path d="M125,98 L145,98 L145,118 L125,118 L125,98 Z"/><path d="M55,133 L75,133 L75,153 L55,153 L55,133 Z"/><path d="M90,133 L110,133 L110,153 L90,153 L90,133 Z"/><path d="M125,133 L145,133 L145,153 L125,153 L125,133 Z"/><path d="M40,10 L70,10 L70,35 L40,35 L40,10 Z"/><path d="M130,10 L160,10 L160,35 L130,35 L130,10 Z"/><path d="M175.45,190 C174.04,190.31 79.26,190.47 42.56,190.32 C36.39,190.22 25.46,190.09 25,190 C23.36,189.64 19.58,187.83 18.45,186.79 C17.30,185.69 15.40,182.12 15,180.45 C14.66,178.92 14.46,85.86 14.68,51 C14.75,48.09 14.92,40.47 15,40 C15.30,38.41 16.86,34.38 17.70,33.34 C18.76,32.09 22.13,30.51 24.55,30 C27.71,29.39 45.20,29.87 50,30 C50,30 150,30 150,30 C152.74,29.92 159.70,29.72 163.93,29.59 C166.93,29.54 176.08,29.91 179.30,31.41 C180.90,32.20 182.98,34.62 183.75,36.44 C185.09,39.81 185.24,47.22 185.28,48.68 C185.73,78.18 185.31,178.47 185,180 C184.64,181.64 182.81,185.43 181.78,186.56 C180.68,187.71 177.12,189.61 175.45,190 M30,175 L30,75 L170,75 L170,175 L30,175 Z" fill-rule="evenodd"/></g>`,
'check':`<g><path d="M17.42,109.28 L51.21,67.44 L90.81,118.47 L175.65,18.10 L182.61,24.18 L99.95,170.49 L17.42,109.28 Z"/></g>`,
'clippen':`<g><path d="M117.93,48.01 L153.28,83.37 L54.29,182.36 L15.40,185.90 L18.93,147.01 L117.93,48.01 Z"/><path d="M152.43,12.51 L187.78,47.87 L166.57,69.08 L131.22,33.72 L152.43,12.51 Z"/><path d="M114.86,11.30 L129,25.44 L107.78,46.65 L100.71,39.58 L58.29,82.01 L51.22,103.22 L37.07,103.22 L30,96.15 L114.86,11.30 Z"/></g>`,
'clock':`<g><path d="M 100 20 A 80 80 0 1 1 100 180 A 80 80 0 1 1 100 20 M 100 40 A 60 60 0 1 1 100 160 A 60 60 0 1 1 100 40" fill-rule="evenodd"/><path d="M90,60 L110,60 L110,90 L140,90 L140,110 L90,110 L90,60 Z"/></g>`,
'cog':`<g><path d="M64.87,36.35 L80.19,30.50 L90,10 L110,10 L119.61,29.61 L134.96,36.72 L156.39,29.16 L170.53,43.30 L163.63,64.02 L163.43,64.53 L169.29,79.84 L189.79,89.65 L189.79,109.65 L169.76,119.64 L163.07,134.61 L170.63,156.04 L156.49,170.18 L135.27,163.08 L127.35,166.11 L120.01,169.11 L110.14,189.44 L90.14,189.44 L80.15,169.41 L65.18,162.72 L43.75,170.28 L29.61,156.14 L36.68,135.48 L30.68,119.66 L10.35,109.79 L10.35,89.79 L29.96,80.18 L36.91,64.76 L29.51,43.40 L43.65,29.26 L64.87,36.35 M 100 70 A 30 30 0 1 1 100 130 A 30 30 0 1 1 100 70 Z" fill-rule="evenodd"/></g>`,
'cogs':`<g><path d="M64.87,36.35 L80.19,30.50 L90,10 L110,10 L119.61,29.61 L134.96,36.72 L156.39,29.16 L170.53,43.30 L163.63,64.02 L163.43,64.53 L169.29,79.84 L189.79,89.65 L189.79,109.65 L169.76,119.64 L163.07,134.61 L170.63,156.04 L156.49,170.18 L135.27,163.08 L127.35,166.11 L120.01,169.11 L110.14,189.44 L90.14,189.44 L80.15,169.41 L65.18,162.72 L43.75,170.28 L29.61,156.14 L36.68,135.48 L30.68,119.66 L10.35,109.79 L10.35,89.79 L29.96,80.18 L36.91,64.76 L29.51,43.40 L43.65,29.26 L64.87,36.35 M 100 70 A 30 30 0 1 1 100 130 A 30 30 0 1 1 100 70 Z" fill-rule="evenodd" transform="translate(0 0) scale(0.7 0.7)"/><path d="M64.87,36.35 L80.19,30.50 L90,10 L110,10 L119.61,29.61 L134.96,36.72 L156.39,29.16 L170.53,43.30 L163.63,64.02 L163.43,64.53 L169.29,79.84 L189.79,89.65 L189.79,109.65 L169.76,119.64 L163.07,134.61 L170.63,156.04 L156.49,170.18 L135.27,163.08 L127.35,166.11 L120.01,169.11 L110.14,189.44 L90.14,189.44 L80.15,169.41 L65.18,162.72 L43.75,170.28 L29.61,156.14 L36.68,135.48 L30.68,119.66 L10.35,109.79 L10.35,89.79 L29.96,80.18 L36.91,64.76 L29.51,43.40 L43.65,29.26 L64.87,36.35 M 100 70 A 30 30 0 1 1 100 130 A 30 30 0 1 1 100 70 Z" fill-rule="evenodd" transform="rotate(25 100 100) translate(110 75) scale(0.5 0.5)"/></g>`,
'delete':`<g><path d="M70,60 L130,60 L130,80 L70,80 L70,60 Z"/><path d="M70,100 L100,100 L100,120 L70,120 L70,100 Z"/><path d="M150,70 L170,70 L170,100 L150,100 L150,70 Z"/><path d="M150,170 L150,190 L170,190 L170,170 L150,170 Z"/><path d="M80,170 L80,190 L30,190 L30,10 L170,10 L170,50 L150,50 L150,30 L50,30 L50,170 L80,170 Z"/><path d="M100,170 L120,170 L120,190 L100,190 L100,170 Z"/><path d="M150,120 L170,120 L170,140 L150,140 L150,120 Z"/></g>`,
'document':`<g><path d="M35,15 L35,155 L145,155 L145,15 L35,15 Z"/><path d="M160,40 L180,40 L180,190 L60,190 L60,170 L160,170 L160,40 Z"/></g>`,
'download':`<g><path d="M100,140 L30,70 L80,70 L80,20 L120,20 L120,70 L170,70 L100,140 Z"/><path d="M100,160 L70,130 L20,130 L20,180 L180,180 L180,130 L130,130 L100,160 Z"/></g>`,
'excel':`<g><path d="M20,35 L130,15 L130,175 L20,175 L20,35 M34.56,54.45 L54.98,54.45 L74.87,88.48 L95.03,54.45 L115.71,54.45 L85.08,104.98 L115.45,155.24 L95.03,155.24 L75.13,121.73 L55.24,154.98 L35.08,154.98 L64.66,104.98 L34.56,54.45 Z" fill-rule="evenodd"/><path d="M150,35 L180,35 L180,175 L150,175 L150,35 Z"/></g>`,
'fish':`<g><path d="M14.80,112.91 L7.20,89.25 L44.83,68.86 L75.42,62.79 L106.51,51 L109.17,68.11 L150.43,93.22 L192.36,51.15 L184.82,101.98 L192.02,152.28 L150.85,110.88 L109.52,142.15 L107.54,160.96 L75.64,145.77 L46.06,142.34 L14.80,112.91 M 50 104 A 7 7 0 1 1 50 90 A 7 7 0 1 1 50 104 Z" fill-rule="evenodd" /></g>`,
'fishbone':`<g><path d="M7.17,89.19 L15.22,113.34 L46.68,142.61 L46.68,110.05 L61.32,110.05 L70.10,148.46 L86.19,152.85 L77.41,110.41 L91.68,110.41 L103.02,157.61 L119.12,159.44 L107.78,110.41 L124.24,110.41 L133.39,143.34 L145.10,130.17 L140.34,110.41 L157.17,110.41 L157.17,118.10 L191.93,152.85 L185.34,103.10 L193.03,51.87 L156.81,88.46 L156.81,94.31 L139.98,94.31 L145.46,75.66 L134.12,63.22 L124.24,94.31 L108.15,94.31 L116.56,54.07 L103.76,48.95 L92.41,94.31 L76.68,94.31 L86.56,54.07 L72.29,57.36 L62.41,94.31 L46.68,94.31 L46.68,67.97 L7.17,89.19 Z"/></g>`,
'flag':`<g><path d="M20,20 L40,20 L40,190 L20,190 L20,20 Z"/><path d="M50,30 L100,30 L120,50 L180,50 L180,150 L120,150 L100,130 L50,130 L50,30 Z"/></g>`,
'folder':`<g><path d="M20,30 L70,30 L90,60 L180,60 L180,180 L20,180 L20,30 Z"/></g>`,
'folderopen':`<g><path d="M30,30 L80,30 L100,60 L190,60 L190,180 L30,180 L10,100 L170,100 L170,80 L30,80 L30,30 Z"/></g>`,
'graph':`<g><path d="M20,10 L20,180 L190,180 L190,160 L40,160 L40,10 L20,10 Z"/><path d="M158.93,27.23 L173.07,41.37 L74.07,140.36 L59.93,126.22 L158.93,27.23 Z"/></g>`,
'grid':`<g><path d="M26,130 L66,130 L66,160 L26,160 L26,130 M81,130 L121,130 L121,160 L81,160 L81,130 M136,130 L176,130 L176,160 L136,160 L136,130 M26,85 L66,85 L66,115 L26,115 L26,85 M81,85 L121,85 L121,115 L81,115 L81,85 M136,85 L176,85 L176,115 L136,115 L136,85 M26,40 L66,40 L66,70 L26,70 L26,40 M81,40 L121,40 L121,70 L81,70 L81,40 M136,40 L176,40 L176,70 L136,70 L136,40 M10,25 L190,25 L190,175 L10,175 L10,25 Z" fill-rule="evenodd"/></g>`,
'heart':`<g><path d="M91.43,61.68 C91.43,61.68 102.33,53.45 102.33,53.45 C122.58,38.60 134.67,30.84 140.76,28.42 C144.59,26.93 151.58,25.70 154.57,26.11 C157.84,26.61 164.63,29.85 167.34,32.09 C170.16,34.48 175.07,39.64 177.82,43.09 C180.94,47.05 184.70,53.90 185.78,57.67 C186.79,61.34 186.99,67.78 186.48,71.03 C185.99,73.93 184.03,79.83 182.57,82.81 C180.17,87.61 170.55,101.38 163.39,110.46 C151.38,125.28 108.55,171.58 100.28,180.46 C91.90,171.64 70.96,149.47 58.39,136.11 C52.82,129.87 40.84,116.15 36.50,110.80 C30.01,102.69 19.94,88.03 17.50,82.96 C16.06,79.95 14.14,73.99 13.66,71.07 C13.16,67.80 13.34,61.32 14.31,57.64 C15.36,53.86 19.01,47 22.04,43.07 C24.71,39.63 29.55,34.47 32.34,32.09 C35.03,29.85 41.84,26.60 45.18,26.08 C48.28,25.65 55.36,26.87 59.19,28.39 C65.29,30.86 77.21,38.88 87.23,46.70 C89.99,48.85 94.69,52.52 96.65,54.04 C96.65,54.04 108.34,62.63 108.34,62.63"/></g></svg>`,
'home':`<g><path d="M30,115 L10,95 L100,15 L190,95 L170,115 L100,55 L30,115 Z"/><path d="M100,75 L50,115 L50,185 L150,185 L150,115 L100,75 Z"/></g>`,
'key':`<g><path d="M90,120 L90,10 L110,10 L110,20 L140,20 L140,40 L110,40 L110,50 L140,50 L140,70 L110,70 L110,120 L90,120 Z" /><path d="M 100 110 A 40 40 0 1 1 100 190 A 40 40 0 1 1 100 110 M 100 130 A 20 20 0 1 1 100 170 A 20 20 0 1 1 100 130 Z" fill-rule="evenodd"/></g></svg>`,
'ku-down':`<g><path d="M180,70 L100,150 L20,70 L40,50 L100,110 L160,50 L180,70 Z"/></g>`,
'ku-first':`<g><path d="M130,20 L150,40 L90,100 L150,160 L130,180 L50,100 L130,20 Z"/><path d="M20,20 L50,20 L50,180 L20,180 L20,20 Z"/></g>`,
'ku-last':`<g><path d="M70,20 L150,100 L70,180 L50,160 L110,100 L50,40 L70,20 Z"/><path d="M150,20 L180,20 L180,180 L150,180 L150,20 Z"/></g>`,
'ku-left':`<g><path d="M130,20 L150,40 L90,100 L150,160 L130,180 L50,100 L130,20 Z"/></g>`,
'ku-right':`<g><path d="M70,20 L150,100 L70,180 L50,160 L110,100 L50,40 L70,20 Z"/></g>`,
'ku-up':`<g><path d="M180,130 L160,150 L100,90 L40,150 L20,130 L100,50 L180,130 Z"/></g>`,
'kuku-left':`<g><path d="M90,20 L110,40 L50,100 L110,160 L90,180 L10,100 L90,20 Z"/><path d="M165,20 L185,40 L125,100 L185,160 L165,180 L85,100 L165,20 Z"/></g>`,
'kuku-right':`<g><path d="M110,20 L190,100 L110,180 L90,160 L150,100 L90,40 L110,20 Z"/><path d="M35,20 L115,100 L35,180 L15,160 L75,100 L15,40 L35,20 Z"/></g>`,
'lanconnector':`<g><path d="M30,30 L30,170 L80,170 L80,190 L120,190 L120,170 L170,170 L170,30 L140,30 L140,100 L120,100 L120,140 L80,140 L80,100 L60,100 L60,30 L30,30 Z"/><path d="M70,10 L130,10 L130,90 L110,90 L110,130 L90,130 L90,90 L70,90 L70,10 Z"/></g>`,
'lanport':`<g><path d="M10,180 L10,20 L190,20 L190,180 L10,180 M30,150 L50,150 L50,140 L70,140 L70,150 L90,150 L90,140 L110,140 L110,150 L130,150 L130,140 L150,140 L150,150 L170,150 L170,70 L130,70 L130,40 L70,40 L70,70 L30,70 L30,150 Z"/></g>`,
'link':`<g><path d="M50,90 L150,90 L150,110 L50,110 L50,90 Z"/><path d="M90,50 C90,50 30,50 30,50 C30,50 10,50 10,100 C10,150 30,150 30,150 C30,150 90,150 90,150 C90,150 90,130 90,130 C90,130 40,130 40,130 C40,130 30,130 30,100 C30,70 40,70 40,70 C40,70 90,70 90,70 C90,70 90,50 90,50 Z"/><path d="M110,50 C110,50 170,50 170,50 C170,50 190,50 190,100 C190,150 170,150 170,150 C170,150 110,150 110,150 C110,150 110,130 110,130 C110,130 160,130 160,130 C160,130 170,130 170,100 C170,70 160,70 160,70 C160,70 110,70 110,70 C110,70 110,50 110,50 Z"/></g>`,
'list':`<g><rect x="15" y="25"  height="30" width="35"  rx="5" /><rect x="70" y="25"  height="30" width="115" rx="5" /><rect x="15" y="85"  height="30" width="35"  rx="5" /><rect x="70" y="85"  height="30" width="115" rx="5" /><rect x="15" y="145" height="30" width="35"  rx="5" /><rect x="70" y="145" height="30" width="115" rx="5" /></g>`,
'lock':`<g><path d="M30,80 L170,80 L170,190 L30,190 L30,80 Z"/><path d="M60,90 C60,90 80,90 80,90 C80,90 80,40 80,40 C80,40 80,30 90,30 C100,30 110,30 110,30 C110,30 120,30 120,40 C120,50 120,90 120,90 C120,90 140,90 140,90 C140,90 140,30 140,30 C140,30 140,10 120,10 C100,10 80,10 80,10 C80,10 60,10 60,30 C60,50 60,90 60,90 Z"/></g>`,
'loop':`<g><path d="M115.05,160.18 L180,160.19 L180,40.05 L20,39.95 L20,160.54 L49.67,130.09 L49.78,69.74 L150.43,69.54 L150.43,129.74 L115.48,129.71 L115.37,99.69 L69.77,144.78 L115.09,190.46 L115.05,160.18 Z"/></g>`,
'mail':`<g><path d="M10,35 L10,45 L100,135 L190,45 L190,35 L10,35 Z"/><path d="M10,170 L10,60 L100,150 L190,60 L190,170 L10,170 Z"/></g>`,
'maze':`<g><path d="M20,40 L20,20 L180,20 L180,180 L60,180 L60,140 L100,140 L100,160 L160,160 L160,40 L20,40 Z"/><path d="M20,60 L140,60 L140,140 L120,140 L120,80 L40,80 L40,180 L20,180 L20,60 Z"/><path d="M60,100 L60,120 L100,120 L100,100 L60,100 Z"/></g>`,
'memo':`<g><path d="M30,10 L170,10 L170,140 L120,190 L30,190 L30,10 M50,30 L150,30 L150,140 L120,140 L120,170 L50,170 L50,30 Z" fill-rule="evenodd"/><path d="M70,60 L130,60 L130,80 L70,80 L70,60 Z"/><path d="M70,100 L70,120 L130,120 L130,100 L70,100 Z"/></g>`,
'mobile':`<g><path d="M30,10 L170,10 L170,190 L30,190 L30,10 M50,30 L150,30 L150,150 L50,150 L50,30 M90,160 L110,160 L110,180 L90,180 L90,160 Z" fill-rule="evenodd"/></g>`,
'mute':`<g><path d="M10,70 L40,70 L100,10 L100,190 L40,130 L10,130 L10,70 Z"/><path d="M190,130 L130,60 L120,70 L180,140 L190,130 Z"/><path d="M120,130 L130,140 L190,70 L180,60 L120,130 Z"/></g>`,
'network':`<g><path d="M 100 15 A 85 85 0 1 1 100 185 A 85 85 0 1 1 100 15 M 100 27 A 73 73 0 1 1 100 173 A 73 73 0 1 1 100 27" fill-rule="evenodd" /><path d="M 100 15 A 85 85 0 1 1 100 185 A 85 85 0 1 1 100 15 M 100 25 A 65 75 0 1 1 100 175 A 65 75 0 1 1 100 25" transform="scale(0.65 1.0) translate(54 0)" fill-rule="evenodd" /><path d="M 93 20 L 107 20 L 107 180 L 93 180 Z" /><path d="M 20 95 L 20 105 L 180 105 L 180 95 Z" /><path d="M 35 55 L 30 65 L 170 65 L 165 55 Z" /><path d="M 35 145 L 30 135 L 170 135 L 165 145 Z" /></g>`,
'noodle':`<g><path d="M12.19,99.81 L34.22,138.19 L77.86,165.48 L77.86,182.47 L121.64,182.47 L121.64,165.48 L165.58,138.19 L187.31,99.81 L12.19,99.81 Z"/><path d="M185.03,12.29 L188.36,25.20 L72.17,55.20 L68.84,42.29 L185.03,12.29 Z"/><path d="M120.01,100.05 L120.01,19.37 L90.22,26.60 L90.22,99.48 L120.01,100.05 Z"/></g>`,
'onepiece':`<g ><path d="M60,15 L80,15 L85,39.88 L115,39.88 L120,15 L140,15 L130,75 L180,175 L100,185 L20,175 L70,75 L60,15 Z"/></g>`,
'onigiri':`<g><path d="M15.02,148.05 C15.51,146.14 21.77,130.99 24.79,124.31 C30.25,112.83 50.61,74.62 59.80,58.55 C63.98,51.63 72.03,38.63 75.69,33.11 C77.42,30.63 81.01,25.45 84.39,22.16 C87.86,18.83 94.14,14.77 96.93,14.05 C99.60,13.43 105.06,14.77 108.17,16.75 C111.34,18.83 118.19,25.45 120.05,28.15 C126.96,38.07 143.89,66.30 153.49,83.49 C158.25,92.39 167,109.21 171,117.14 C174.41,124.31 180.60,138.41 182.32,142.86 C184.03,147.47 185.28,152.43 185.47,156.81 C185.60,160.63 183.95,166.21 182.19,167.94 C180.66,169.36 174.57,172.12 170.61,173.25 C161.31,175.84 146.72,177.05 139.84,177.49 C124.43,178.11 87.79,178.36 70.71,177.99 C63,177.67 45.08,176.50 43.21,176.24 C38.18,175.53 28.34,173.29 24.85,172.07 C21.47,170.86 16.67,167.97 15.46,165.96 C14.18,163.69 13.50,157 14.13,152.70 C14.41,150.84 14.71,149.30 15.02,148.05 M25,142.36 C25.51,140.35 32.01,124.98 35.25,118.04 C38.94,110.51 47.86,93.51 52.63,84.62 C63.87,64.73 74.24,48.05 77.84,42.68 C80.87,38.35 84.55,34.16 88.30,31.32 C89.96,30.09 93.05,28.44 94.50,27.99 C95.93,27.60 98.60,27.60 100.03,27.99 C102.93,28.88 109.98,34.16 113.32,37.97 C114.20,38.98 124.13,54.06 128.21,60.73 C132.65,68.37 141.97,84.86 146.85,93.72 C157.33,113.87 166.20,133.40 167.64,137.14 C169.37,141.71 170.66,146.93 170.66,151.01 C170.63,152.84 170.02,155.90 169.45,157.12 C168.35,159.27 163.41,162.17 159.74,163.35 C151.24,166.02 136.16,167.23 129.17,167.64 C116.96,168.13 73.48,168.02 61.79,167.45 C51.03,166.72 38.03,164.86 31.38,162.10 C29.89,161.46 27.32,159.96 26.56,159.22 C25.70,158.32 24.50,155.90 24.19,154.38 C23.60,151.23 24.51,144.34 25,142.36 Z" fill-rule="evenodd"/><path d="M63,175 L63,95 L133,95 L133,175 L63,175 Z"/></g>`,
'outlook':`<g><path d="M150,35 L180,35 L180,175 L150,175 L150,35 Z"/><path d="M20,35 L130,15 L130,175 L20,175 L20,35 M75,55 C75,55 115,55 115,105 C115,155 75,155 75,155 C75,155 35,155 35,105 C35,55 75,55 75,55 M75,65 C75,65 55,65 55,105 C55,145 75,145 75,145 C75,145 95,145 95,105 C95,65 75,65 75,65 Z" fill-rule="evenodd" /></g>`,
'panels':`<g><rect x="20"  y="20"  height="40" width="40" /><rect x="20"  y="80"  height="40" width="40" /><rect x="20"  y="140" height="40" width="40" /><rect x="80"  y="20"  height="40" width="40" /><rect x="80"  y="80"  height="40" width="40" /><rect x="80"  y="140" height="40" width="40" /><rect x="140" y="20"  height="40" width="40" /><rect x="140" y="80"  height="40" width="40" /><rect x="140" y="140" height="40" width="40" /></g>`,
'pen':`<g><path d="M117.93,48.01 L153.28,83.37 L54.29,182.36 L15.40,185.90 L18.93,147.01 L117.93,48.01 Z"/><path d="M152.43,12.51 L187.78,47.87 L166.57,69.08 L131.22,33.72 L152.43,12.51 Z"/></g>`,
'pencil':`<g><path d="M152.30,13.66 L187.51,48.87 L75.17,161.22 L21.88,185.79 L15.75,185.25 L15.62,179.53 L40.37,125.12 L152.30,13.66 M47.15,133.16 L68.36,154.35 L41.91,166.81 L34.17,159.07 L47.15,133.16 Z" fill-rule="evenodd"/></g>`,
'piechart':`<g><!--<path opacity="1.0" d="M 90 30 a 80 80 0 1 0 53 140 l -53 -60 Z"/><path opacity="1.0" d="M 110 10 a 80 80 1 0 1 80 80 l -80 0 Z" /><path opacity="1.0" d="M 190 107 a 80 80 1 0 1 -27 60 l -53 -60 Z"/>--><path opacity="1.0" d="M 90 30 a 80 80 0 1 0 80 80 l -80 0 Z"/><path opacity="1.0" d="M 110 10 a 80 80 1 0 1 80 80 l -80 0 Z" /></g>`,
'piramid':`<g><path d="M10,160 L100,180 L190,160 L100,20 L99.76,152.09 L117.61,149.29 L117.70,158.48 L133.42,155.02 L133.64,164.46 L100,172.31 L20,155 L101.38,27.25 L100.25,20.38 L10,160 Z"/></g>`,
'powerpoint':`<g><path d="M150,35 L180,35 L180,175 L150,175 L150,35 Z"/><path d="M20,35 L130,15 L130,175 L20,175 L20,35 M61,160 C61,160 41,160 41,160 C41,160 41,50 41,50 C41,50 111,40 111,80 C111,120 61,120 61,120 C61,120 61,160 61,160 M56,63 C56,63 96,63 96,83 C96,103 56,103 56,103 C56,103 56,63 56,63 Z" fill-rule="evenodd"/></g>`,
'printer':`<g><path d="M60,80 L140,80 L140,20 L60,20 L60,80 Z"/><path d="M60,165 L60,185 L140,185 L140,165 L60,165 Z"/><path d="M10,80 L40,80 L40,100 L160,100 L160,80 L190,80 L190,150 L10,150 L10,80 Z"/></g>`,
'refresh':`<g><path d="M18.28,122.98 C17.70,138.40 46.04,186 99.50,186 C151.43,186 178.45,143.75 183.37,118.57 C183.37,118.57 153.66,118.56 153.66,118.56 C146.28,137.32 129.29,157.50 99.50,157.50 C67.75,157.50 48.15,130.96 45.96,118.40 C45.96,118.40 18.28,122.98 18.28,122.98 Z"/><path d="M180.36,72.31 C172.59,54.53 152.96,15 99.50,15 C43.53,15 20.18,62.58 17.43,80.59 C17.43,80.59 46.39,80.50 46.39,80.50 C52.03,67.29 66.44,43.27 98.84,43.50 C136.24,43.77 152.67,74.16 154.65,84.65 C154.65,84.65 180.36,72.31 180.36,72.31 Z"/><path d="M14,176.50 L14,110 L80.50,110 L14,176.50 Z"/><path d="M118.50,91 L185,91 L185,24.50 L118.50,91 Z"/></g>`,
'ribbon':`<g><path d="M20,30 L10,65 L20,120 L50,120 L85,105 L40.99,149.63 L79.78,179.07 L97.31,115 L103.29,115 L120.54,180 L159.63,150.25 L115,105 L150,120 L180,120 L190,65 L180,30 L145,50 L110,80 L90,80 L55,50 L20,30 Z"/></g>`,
'rice':`<g><path d="M12.19,99.81 L34.22,138.19 L77.86,165.48 L77.86,182.47 L121.64,182.47 L121.64,165.48 L165.58,138.19 L187.31,99.81 L12.19,99.81 Z"/><path d="M31.28,105 C31.27,102.25 32.09,96.89 32.97,93.91 C34.79,87.91 42.15,74.18 47.70,66.45 C50.63,62.40 57.11,54.29 60.27,50.89 C63.54,47.40 70.09,41.57 73.37,39.23 C76.65,36.91 83.22,33.43 86.52,32.26 C89.81,31.13 96.28,30.02 99.72,30 C103.16,30.02 109.63,31.13 112.93,32.26 C116.22,33.43 122.79,36.91 126.08,39.23 C129.36,41.57 135.90,47.40 139.17,50.89 C145.18,57.37 157.29,74.18 160.99,81.06 C162.82,84.48 165.56,90.91 166.47,93.91 C167.35,96.89 168.17,102.25 168.16,105 C168.11,108.75 166.66,114.26 165.06,116.81 C163.43,119.34 158.52,123.61 155.24,125.35 C149.78,128.17 130.42,132.75 121.70,133.83 C112.68,134.93 91.77,135.01 86.52,134.67 C77.73,134.06 58.99,130.70 51.63,128.38 C47.54,127.07 40.92,123.61 38.45,121.49 C36.01,119.34 32.79,114.26 31.99,111.32 C31.59,109.76 31.31,107.07 31.28,105 M37.66,108.81 C37.64,105.96 38.55,99.94 39.50,96.61 C41.46,89.91 49.63,73.72 55.28,65.33 C58.12,61.14 63.87,54.20 66.75,51.50 C69.62,48.84 75.39,45.02 78.28,43.86 C81.19,42.74 86.97,42.02 89.87,42.36 C92.75,42.74 98.55,45.02 101.44,46.91 C104.32,48.84 110.07,54.20 112.94,57.64 C118.26,64.09 129.04,82.37 132,89.64 C133.46,93.26 135.39,99.94 135.87,103 C136.30,105.96 136.22,113.12 135.37,116.02 C134.36,119.30 130.31,124.63 127.27,126.69 C124.35,128.61 116.46,131.42 111.86,132.59 C103.61,134.65 86.97,135.82 78.64,135.25 C74.49,134.95 66.21,133.62 62.08,132.59 C57.48,131.42 49.60,128.61 46.67,126.69 C43.63,124.63 39.58,119.30 38.57,116.02 C38.07,114.29 37.69,111.15 37.66,108.81 Z" fill-rule="evenodd"/></g>`,
'search':`<g><path d="M134.14,108.73 L112.93,129.94 L170.11,187.12 L191.33,165.91 L134.14,108.73 Z"/><path d="M 80 10 A 70 70 0 1 1 80 150 A 70 70 0 1 1 80 10 M 80 30 A 50 50 0 1 1 80 130 A 50 50 0 1 1 80 30Z" fill-rule="evenodd"/></g>`,
'share':`<g><circle cx="160" cy="40" r="30" /><circle cx="40" cy="100" r="30" /><circle cx="160" cy="160" r="30" /><path d="M149.58,34.70 L19.98,100.16 L154.05,168.51 L161.41,150.63 L60.46,99.63 L159.83,50.47 L149.58,34.70 Z"/></g>`,
'signet':`<g><path d="M124.08,9.43 L175.27,40.73 L102.24,160.17 L51.05,128.87 L124.08,9.43 Z"/><path d="M63.32,164 C45.42,164 26.60,169.41 26.60,174 C26.60,180.39 45.42,184 63.32,184 C81.23,184 99.26,179.82 99.26,174 C99.26,169.12 81.23,164 63.32,164 Z"/></g>`,
'signin':`<g><path d="M101,20 L181,20 L181,180 L101,180 L101,150 L151,150 L151,50 L101,50 L101,20 Z"/><path d="M20,70 L20,130 L70,130 L70,180 L130,100 L70,20 L70,70 L20,70 Z"/></g>`,
'signout':`<g><path d="M100,20 L20,20 L20,180 L100,180 L100,150 L50,150 L50,50 L100,50 L100,20 Z"/><path d="M70,70 L70,130 L120,130 L120,180 L180,100 L120,20 L120,70 L70,70 Z"/></g>`,
'sort-asc':`<g><path d="M100,25 L50,85 L150,85 L100,25 Z" fill-opacity="0.3"/><path d="M50,115 L150,115 L100,175 L50,115 Z"/></g>`,
'sort-desc':`<g><path d="M100,25 L50,85 L150,85 L100,25 Z"/><path d="M50,115 L150,115 L100,175 L50,115 Z" fill-opacity="0.3"/></g>`,
'sort':`<g><path d="M100,25 L50,85 L150,85 L100,25 Z"/><path d="M50,115 L150,115 L100,175 L50,115 Z"/></g>`,
'star':`<g><path d="M47.06,177.84 L99.70,147.94 L152.92,177.93 L140.75,118.55 L185.85,77.17 L125.48,70.43 L100.05,15.23 L75,70.08 L13.98,77.04 L59.07,117.99 L47.06,177.84 Z"/></g>`,
'storm':`<g><path d="M14.50,28.50 L36.05,80.04 L169.48,52.49 L184.50,20 L96,24.50 L14.50,28.50 Z"/><path d="M67.04,104.98 L48.52,72.98 L159.49,62.98 L130.47,117.02 L67.04,104.98 Z"/><path d="M77.02,118.47 L93.05,153.53 L126.93,135.48 L143.95,110.01 L77.02,118.47 Z"/><path d="M89.53,162.02 L123.98,145.99 L93.19,185.75 L89.53,162.02 Z"/></g>`,
'swap':`<g><path d="M180,70 L180,50 L70,50 L70,20 L10,60 L70,100 L70,70 L180,70 Z"/><path d="M20,130 L130,130 L130,100 L190,140 L130,180 L130,150 L20,150 L20,130 Z"/></g>`,
'tag':`<g><path d="M60,30 L40,30 L10,100 L40,170 L60,170 L30,100 L60,30 Z"/><path d="M140,30 L160,30 L190,100 L160,170 L140,170 L170,100 L140,30 Z"/><path d="M109.61,39.78 L128.59,46.08 L90.76,159.96 L71.78,153.66 L109.61,39.78 Z"/></g>`,
'talk':`<g><path d="M20,40 L180,40 L180,160 L130,160 L100,190 L70,160 L20,160 L20,40 M50,90 L70,90 L70,110 L50,110 L50,90 M90,90 L110,90 L110,110 L90,110 L90,90 M130,90 L130,110 L150,110 L150,90 L130,90 Z" fill-rule="evenodd"/></g>`,
'tie':`<g><path d="M75,15 L100,10 L125,15 L120,35 L110,40 L150,150 L100,190 L50,150 L90,40 L80,35 L75,15 Z"/></g>`,
'toggle1-left':`<g><path d="M60,60 L140,60 L140,140 L60,140 L60,60 M 140 60 A 40 40 0 1 1 140 140 M 60 140 A 40 40 0 1 1 60 60 Z" fill-opacity="0.3"/><circle cx="60" cy="100" r="50" /></g>`,
'toggle1-right':`<g><path d="M60,60 L140,60 L140,140 L60,140 L60,60 M 140 60 A 40 40 0 1 1 140 140 M 60 140 A 40 40 0 1 1 60 60 Z" fill-opacity="0.3"/><circle cx="140" cy="100" r="50" /></g>`,
'toggle2-left':`<g><path d="M20,40 C20,40 10,40 10,50 C10,60 10,150 10,150 C10,150 10,160 20,160 C30,160 180,160 180,160 C180,160 190,160 190,150 C190,140 190,50 190,50 C190,50 190,40 180,40 C170,40 20,40 20,40 M35,55 C35,55 25,55 25,65 C25,75 25,135 25,135 C25,135 25,145 35,145 C45,145 75,145 75,145 C75,145 85,145 85,135 C85,125 85,65 85,65 C85,65 85,55 75,55 C65,55 35,55 35,55 Z" fill-rule="evenodd"/></g>`,
'toggle2-right':`<g><path d="M20,40 C20,40 10,40 10,50 C10,60 10,150 10,150 C10,150 10,160 20,160 C30,160 180,160 180,160 C180,160 190,160 190,150 C190,140 190,50 190,50 C190,50 190,40 180,40 C170,40 20,40 20,40 M125,55 C125,55 115,55 115,65 C115,75 115,135 115,135 C115,135 115,145 125,145 C135,145 165,145 165,145 C165,145 175,145 175,135 C175,125 175,65 175,65 C175,65 175,55 165,55 C155,55 125,55 125,55 Z" fill-rule="evenodd"/></g>`,
'trash':`<g><path d="M25,10 L25,30 L175,30 L175,10 L25,10 Z"/><path d="M25,50 L175,50 L155,190 L45,190 L25,50 Z"/></g>`,
'triforce':`<g><path d="M100.38,20.30 L144.20,96.20 L56.55,96.20 L100.38,20.30 Z"/><path d="M55.38,97.30 L99.20,173.20 L11.55,173.20 L55.38,97.30 Z"/><path d="M144.38,97.30 L188.20,173.20 L100.55,173.20 L144.38,97.30 Z"/></g>`,
'tshirt':`<g><path d="M20.70,94.21 L10.35,46.30 L73.80,28.69 L80,48 L99.69,57.66 L120,48 L126.90,27.66 L190.69,45.27 L179.66,93.18 L149.47,87.65 L149.66,179.72 L50.34,179.72 L50.34,88.35 L20.70,94.21 Z"/></g>`,
'unlock':`<g><path d="M30,80 L170,80 L170,190 L30,190 L30,80 Z"/><path d="M60.78,93.16 C60.78,93.16 52.58,33.73 52.58,33.73 C52.58,33.73 49.85,13.91 69.66,11.18 C89.47,8.45 89.47,8.45 109.29,5.72 C129.10,2.99 131.83,22.80 131.83,22.80 C131.83,22.80 134.56,42.61 134.56,42.61 C134.56,42.61 114.75,45.34 114.75,45.34 C114.75,45.34 113.38,35.44 113.38,35.44 C113.38,35.44 112.02,25.53 102.11,26.90 C92.21,28.26 82.30,29.63 82.30,29.63 C82.30,29.63 72.39,30.99 73.76,40.90 C75.12,50.81 80.59,90.43 80.59,90.43 C80.59,90.43 60.78,93.16 60.78,93.16 Z"/></g>`,
'upload':`<g><path d="M100,21 L30,91 L80,91 L80,141 L120,141 L120,91 L170,91 L100,21 Z"/><path d="M60,130 L60,160 L140,160 L140,130 L180,130 L180,180 L20,180 L20,130 L60,130 Z"/></g>`,
'user':`<g><path d="M20,190 C20,190 180,190 180,190 C180,190 170,120 100,120 C30,120 20,190 20,190 Z"/><circle cx="100" cy="55" r="45" /></g>`,
'volume0':`<g><path d="M10,70 L40,70 L100,10 L100,190 L40,130 L10,130 L10,70 Z"/><path d="M126.97,58.80 C126.97,58.80 150,70.23 150,100.41 C150,127.95 126.95,141.75 126.95,141.75 C126.95,141.75 126.97,58.80 126.97,58.80 Z" fill-opacity="0.3"/><path d="M142.76,36.06 C142.76,36.06 154.96,18.11 154.96,18.11 C154.96,18.11 190.83,47.50 190.83,100.41 C190.83,153.41 154.65,181.98 154.65,181.98 C154.65,181.98 143.36,164.60 143.36,164.60 C143.36,164.60 170.25,137.73 170.25,100.83 C170.25,58.64 142.76,36.06 142.76,36.06 Z" fill-opacity="0.3"/></g>`,
'volume1':`<g><path d="M10,70 L40,70 L100,10 L100,190 L40,130 L10,130 L10,70 Z"/><path d="M126.97,58.80 C126.97,58.80 150,70.23 150,100.41 C150,127.95 126.95,141.75 126.95,141.75 C126.95,141.75 126.97,58.80 126.97,58.80 Z"/><path d="M142.76,36.06 C142.76,36.06 154.96,18.11 154.96,18.11 C154.96,18.11 190.83,47.50 190.83,100.41 C190.83,153.41 154.65,181.98 154.65,181.98 C154.65,181.98 143.36,164.60 143.36,164.60 C143.36,164.60 170.25,137.73 170.25,100.83 C170.25,58.64 142.76,36.06 142.76,36.06 Z" fill-opacity="0.3"/></g>`,
'volume2':`<g><path d="M10,70 L40,70 L100,10 L100,190 L40,130 L10,130 L10,70 Z"/><path d="M126.97,58.80 C126.97,58.80 150,70.23 150,100.41 C150,127.95 126.95,141.75 126.95,141.75 C126.95,141.75 126.97,58.80 126.97,58.80 Z"/><path d="M142.76,36.06 C142.76,36.06 154.96,18.11 154.96,18.11 C154.96,18.11 190.83,47.50 190.83,100.41 C190.83,153.41 154.65,181.98 154.65,181.98 C154.65,181.98 143.36,164.60 143.36,164.60 C143.36,164.60 170.25,137.73 170.25,100.83 C170.25,58.64 142.76,36.06 142.76,36.06 Z"/></g>`,
'word':`<g><path d="M150,35 L180,35 L180,175 L150,175 L150,35 Z"/><path d="M20,35 L130,15 L130,175 L20,175 L20,35 M26.95,65.25 L42.04,65.25 L54.73,106.06 L67.07,65.25 L81.82,65.25 L94.85,106.06 L107.19,65.59 L121.94,65.93 L99.99,145.84 L90.05,145.84 L74.96,95.08 L59.18,144.81 L48.90,144.81 L26.95,65.25 Z" fill-rule="evenodd"/></g>`,
}
