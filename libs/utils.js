import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'

//preview an image
export const previewImage = (event,setHeight,setWidth,setOriginal_height,setOriginal_width) => {

    const imagePreview = document.querySelector('#imagePreview img');

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
          const imageUrl = e.target.result;
          const img = new Image();

          img.onload = function() {
              setHeight(img.height)  
              setWidth(img.width)
              setOriginal_height(img.height)
              setOriginal_width(img.width)
              imagePreview.setAttribute('src',imageUrl);
          };

          img.src = imageUrl;
      };

      reader.readAsDataURL(file);
    } 
  }

export const scaleImage = (event,type) => {

    switch (type) {
        case '1:1':
            props.changeWidth(Math.round(props.original_width * (1/1)))
            props.changeHeight(Math.round(props.original_height * (1/1)))
            document.getElementById('width').value = Math.round(props.original_width * (1/1))
            document.getElementById('height').value = Math.round(props.original_height * (1/1))
            break;

        case '3:2':
            props.changeWidth(Math.round(props.original_width * (3/2)))
            props.changeHeight(Math.round(props.original_height * (2/3)))
            document.getElementById('width').value = Math.round(props.original_width * (3/2))
            document.getElementById('height').value = Math.round(props.original_height * (2/3))
            break;

        case '2:3':
            props.changeWidth(Math.round(props.original_width * (2/3)))
            props.changeHeight(Math.round(props.original_height * (3/2)))
            document.getElementById('width').value = Math.round(props.original_width * (2/3))
            document.getElementById('height').value = Math.round(props.original_height * (3/2))
            break;

        case '4:3':
            props.changeWidth(Math.round(props.original_width * (4/3)))
            props.changeHeight(Math.round(props.original_height * (3/4)))
            document.getElementById('width').value = Math.round(props.original_width * (4/3))
            document.getElementById('height').value = Math.round(props.original_height * (3/4))
            break;

        case '3:4':
            props.changeWidth(Math.round(props.original_width * (3/4)))
            props.changeHeight(Math.round(props.original_height * (4/3)))
            document.getElementById('width').value = Math.round(props.original_width * (3/4))
            document.getElementById('height').value = Math.round(props.original_height * (4/3))
            break;

        case '16:9':
            props.changeWidth(Math.round(props.original_width * (16/9)))
            props.changeHeight(Math.round(props.original_height * (9/16)))
            document.getElementById('width').value = Math.round(props.original_width * (16/9))
            document.getElementById('height').value = Math.round(props.original_height * (9/16))
            break;

        case '9:16':
            props.changeWidth(Math.round(props.original_width * (9/16)))
            props.changeHeight(Math.round(props.original_height * (16/9)))
            document.getElementById('width').value = Math.round(props.original_width * (9/16))
            document.getElementById('height').value = Math.round(props.original_height * (16/9))
            break;

        case 'original':
            props.changeWidth(props.original_width)
            props.changeHeight(props.original_height)
            document.getElementById('width').value = props.original_width
            document.getElementById('height').value = props.original_height
            break;


    
        default:

            props.changeWidth(props.original_width)
            props.changeHeight(props.original_height)
            document.getElementById('width').value = props.original_width
            document.getElementById('height').value = props.original_height
            break;
    }

    const arr = document.querySelectorAll('.scaler .parent.border')
    
    arr.forEach(elem => {

        elem.classList.contains('border') ? elem.classList.remove('border') : ''
    })

    let el = event.target

    if(el.classList.contains('child') || el.classList.contains('min-h-3')){

        el.parentElement.classList.add('border')
    
    }else{

        el.classList.add('border')
    }
}

//add 30 days to current date
export const addOneMonth = () => {

    // Get the current date
    let currentDate = new Date();

    // Add 30 days to the current date
    currentDate.setDate(currentDate.getDate() + 30);

    // Get the timestamp of the final date
    let finalTimestamp = currentDate.getTime();

    return finalTimestamp

}

//get the current date
export const currentTimestamp = () => {

    // Get the current date
    let currentDate = new Date();

    // Add 30 days to the current date
    currentDate.setDate(currentDate.getDate());

    // Get the timestamp of the final date
    let finalTimestamp = currentDate.getTime();

    return finalTimestamp

}

export const getUrlParameter = (parameterName) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
}

export const notifyInfo = (title,text,autoclose,timeout) => {

    new Notify({
        status: 'info',
        title: title,
        text: text,
        effect: 'fade',
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: autoclose,
        autotimeout: timeout,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'right top'
    })
}
