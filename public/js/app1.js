const WeatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message0 = document.querySelector('#message-0')
const message1 = document.querySelector('#message-1')





const forecast=(address)=>{
    message0.textContent= 'Loading Weather....!'
    fetch('http://localhost:3000/weather?address='+address+'').then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message0.textContent= data.error
            }else{
                message0.textContent= data.Location
                message1.textContent= data.forecastdata
            }

        })
    })
}

WeatherForm.addEventListener('submit',(e)=>{
    message1.textContent= ''
    e.preventDefault()
    const location = search.value
    forecast(location)
})
