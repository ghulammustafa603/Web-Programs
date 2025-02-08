let x=document.querySelector('button');
x.addEventListener('click',takeinput);
function showmsg()
{
    alert("button clicked!");
}
function takeinput()
{
    let name=prompt("Enter the name of student.");
    x.textContent="The name is "+name;
}