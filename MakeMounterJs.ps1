$myDir=(Split-path $MyInvocation.MyCommand.Path -parent)

$js = @'
window.addEventListener("load", function() {
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
                if(rec.attributeName == "yu-icon"){
                    setInnerSvg(rec.target)
                }
            }
        })
    })
    obs.observe(document.body, {
        attributes: true,
        childList: true,
        subtree:true,
        attributeFilter:["yu-icon"],
    })
    //function
    function setInnerSvg(target){
        const key = target.getAttribute("yu-icon")
        if(!key) return
        let val = YuSvgIcons[key]
        if(val == undefined) val = ""
        target.setAttribute('viewBox','0 0 200 200')
        target.style["fill"] = "currentColor"
        const size = target.getAttribute('size')
        if(size){
            target.setAttribute('width',size)
            target.setAttribute('height',size)
            target.style['width']=size+'px'
            target.style['height']=size+'px'
        }
        target.innerHTML = val
    }
})

'@

$js += @'
var YuSvgIcons = {
'noting':'',

'@

foreach($f in (Get-ChildItem -Filter "*.svg")){
    $name = $f.Name.Replace("icon-","").Replace(".svg", "")
    $code = "'$name':``"
    $strs = Get-Content $f
    for($i = 1; $i -lt $strs.Length - 1; $i++){
        $code += $strs[$i].Replace(' fill="#A0A0A0"',"").Replace(".00", "")
    }
    $code += "``,`r`n"
    $js += $code
}

$js += "}"

Set-Content "svg-icons.js" $js