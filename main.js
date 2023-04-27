let issues = [];

function getComplains()
{
     issues = JSON.parse(localStorage.getItem('issues'));
    let complaintList = document.getElementById('complaintbody')

    complaintList.innerHTML = '';

    for (let index = 0; index < issues.length; index++) {
        let id = issues[index].id;
        let desc = issues[index].desc;
        let severity = issues[index].severity;
        let assignedTo = issues[index].assignedTo;
        let status = issues[index].status;

        complaintList.innerHTML +=
        `<tr>
         <td> ${id} </td>
         <td> ${desc} </td>
        <td> ${severity} </td>
        <td> ${assignedTo} </td>
        <td> ${status} </td>
        <td> <button type="button" class="btn btn-warning" onclick="setStatusClosed(\'${id}'\)" value="Close"> <i class="fa fa-window-close"></i> Close </button>
        <button type="button" class="btn btn-danger" onclick="deleteComplaint(\'${id}'\)"  
        value="Delete"> <i class="fa fa-trash"></i> Delete </button>
        </td>
        </tr>`
    }
}

function deleteComplaint(id)
{
    issues = JSON.parse(localStorage.getItem('issues'));
     
    for (let index = 0; index < issues.length; index++) {
        if(issues[index].id == id){
            issues.splice(index,1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    getComplains();


}

function setStatusClosed(id){
    issues = JSON.parse(localStorage.getItem('issues'));
     
    for (let index = 0; index < issues.length; index++) {
        const element = issues[index];
        if(issues[index].id == id){
            issues[index].status ='Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    getComplains()
}

function editComplaint(index){
    if(localStorage.getItem("issues") == null)
        {
            issues = [];
        }
        else{
            //get data from session storage and store in the array
            //using JSON.parse because data as string, we need convert to array
            issues = JSON.parse(localStorage.getItem("issues"));
        }
    // issues = JSON.parse(localStorage.getItem('issues'));
    document.getElementById('DescInput').value = issues[index].desc ;
    document.getElementById('SevInput').value = issues[index].severity ;
    document.getElementById('AssignedToInput').value =  issues[index].assignedTo;

    
     
    // for (let index = 0; index < issues.length; index++) {
    //     if(issues[index].id == id){
    //         issues.splice(index,1);
    //     }
    // }

    // localStorage.setItem('issues', JSON.stringify(issues))

    getComplains();
}

document.getElementById('complaintform').addEventListener('submit', addComplaint);

function addComplaint(e){

    let complaintDesc = document.getElementById('DescInput').value;
    let complaintSev = document.getElementById('SevInput').value;
    let complaintAssigned = document.getElementById('AssignedToInput').value;
    let complaintId = chance.guid();
    let complaintStatus ='Open';

    let complaints ={
        id: complaintId,
        desc: complaintDesc,
        severity: complaintSev,
        assignedTo: complaintAssigned,
        status: complaintStatus
    }

    if(localStorage.getItem('issues') == null){
        let issues = [];
        issues.push(complaints);
        localStorage.setItem('issues', JSON.stringify(issues))
    }
    else{
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(complaints);
        localStorage.setItem('issues',JSON.stringify(issues))
    }
    document.getElementById('complaintform').reset();

    getComplains();

    e.preventDefault();
}

let newarray = [];
//for search box
document.getElementById("search").addEventListener("keyup", function(){
    let search = this.value.toLowerCase();
    
    newarray = issues.filter(function (val){

        if(val.id.includes(search) || val.desc.includes(search)|| val.severity.includes(search)
        || val.status.includes(search)){
            let newobj = {
                id: val.id,
                desc: val.desc,
                severity: val.severity,
                status: val.status
            }
            console.table(newobj)
            return newobj;
        }
    })
    showComplains(newarray)
})

function showComplains(currarray)
{
     issues = JSON.parse(localStorage.getItem('issues'));
    let complaintList = document.getElementById('complaintbody')

    complaintList.innerHTML = '';

    if(currarray == "" )
        {
            document.getElementById('error').innerHTML = 
            `<span>Not Found</span>`
        }
    else{
        for (let index = 0; index < issues.length; index++) {
            let id = issues[index].id;
            let desc = issues[index].desc;
            let severity = issues[index].severity;
            let assignedTo = issues[index].assignedTo;
            let status = issues[index].status;
            
            complaintList.innerHTML +=
            `<tr>
             <td> ${id} </td>
             <td> ${desc} </td>
            <td> ${severity} </td>
            <td> ${assignedTo} </td>
            <td> ${status} </td>
            <td> <button type="button" class="btn btn-warning" onclick="setStatusClosed(\'${id}'\)" value="Close"> <i class="fa fa-window-close"></i> Close </button>
            <button type="button" class="btn btn-danger" onclick="deleteComplaint(\'${id}'\)"  
            value="Delete"> <i class="fa fa-trash"></i> Delete </button>
            <button type="button" class="btn btn-secondary" onclick="editComplaint(\'${id}'\)"  
            value="Edit"> <i class="fa fa-edit"></i> Edit </button> 
            </td>
            </tr>`
        }
    }
 
}
