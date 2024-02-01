import React from 'react'

const EmergencyForm = () => {
    return (
        <div className='main px-3'>
            <div className='text-center'>
                <h2>Emergency Form</h2>
            </div>
            <div className='' style={{paddingTop : "50px"}}>
                <form>
                    <div class="form-floating mb-3">
                        <input type="file" class="form-control" id="floatingInput" placeholder="name@example.com" />
                      
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Contact</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Address</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Description</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmergencyForm