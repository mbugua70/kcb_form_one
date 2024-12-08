const form = document.getElementById("data_form");
const inputs = document.querySelectorAll("input");
const selectElements = document.querySelectorAll("select_els");
const selectElContainer_1 = document.getElementById("sub_1_4");
const selectElContainer_2 = document.getElementById("sub_1_6");


const hideContainerOne = document.getElementById("hide_container_one");
const hideContainerTwo = document.getElementById("hide_container_two");


// hide functionality

selectElContainer_1.addEventListener(
  "input",
  function () {
    valueOne = $("#sub_1_4").val();
    console.log(valueOne);
    if ($("#email").val() === valueOne) {
      hideContainerOne.style.display = "block";
      hideContainerTwo.style.display = "none";
    } else {
      hideContainerOne.style.display = "none";
      hideContainerTwo.style.display = "block";
    }
    if(valueOne === ""){
      hideContainerOne.style.display = "none";
      hideContainerTwo.style.display = "none";
      hideContainerTwo.value = "";
      hideContainerOne.value = "";
    }
  },
  false
);

// selectElContainer_2.addEventListener(
//   "input",
//   function () {
//     valueOne = $("#sub_1_6").val();
//     if ($("#no_6").val() === valueOne) {
//       hideContainerTwo.style.display = "block";
//     } else {
//       hideContainerTwo.style.display = "none";
//     }
//   },
//   false
// );

// selectElContainer_3.addEventListener(
//   "input",
//   function () {
//     valueOne = $("#sub_1_11").val();
//     if ($("#yes_11").val() === valueOne) {
//       hideContainerThree.style.display = "block";
//     } else {
//       hideContainerThree.style.display = "none";
//     }
//   },
//   false
// );

// selectElContainer_4.addEventListener(
//   "input",
//   function () {
//     valueOne = $("#sub_1_21").val();
//     if ($("#others_21").val() === valueOne) {
//       hideContainerFour.style.display = "block";
//     } else {
//       hideContainerFour.style.display = "none";
//     }
//   },
//   false
// );

// selectElContainer_5.addEventListener(
//   "input",
//   function () {
//     valueOne = $("#sub_1_13").val();
//     if ($("#others_13").val() === valueOne) {
//       hideContainerFive.style.display = "block";
//     } else {
//       hideContainerFive.style.display = "none";
//     }
//   },
//   false
// );

// selectElContainer_6.addEventListener(
//   "input",
//   function () {
//     valueOne = $("#sub_1_15").val();
//     if ($("#others_15").val() === valueOne) {
//       hideContainerSix.style.display = "block";
//     } else {
//       hideContainerSix.style.display = "none";
//     }
//   },
//   false
// );

form.addEventListener(
  "submit",
  async function (e) {
    e.preventDefault();
    const formData_one = new FormData(form);

    const sub_1_1 = formData_one.get("sub_1_1");
    const sub_1_2 = formData_one.get("sub_1_2");
    const sub_1_3 = formData_one.get("sub_1_3");


    if (sub_1_1 === "" || sub_1_2 === "" || sub_1_3 === "" ) {
      appNotifier("Please fill in all the required fields!");
    } else {
      //  appending to the formData object created above

      // //    checking the consent
      // const { value: accept } = await Swal.fire({
      //   title: "CONSENT",
      //   input: "checkbox",
      //   inputValue: 1,
      //   inputPlaceholder: `
      //     By submitting this form, you agree to receive communications from KSPCA and understand that you can opt-out anytime
      //   `,
      //   confirmButtonText: `
      //     Continue&nbsp;<i class="fa fa-arrow-right"></i>
      //   `,
      //   inputValidator: (result) => {
      //     return !result && "You need to agree with T&C";
      //   },
      // });


        // form submission

        setTimeout(() => {
          fetch("https://iguru.co.ke/kcb_demo/process/BM.php", {
            method: "POST",
            body: formData_one,
          })
            .then((res) => res.json())
            .then((data) => {

              if (data.response === "success") {
                workingNotifier("You have registered successfully!");
                // setTimeout(() => {
                //   window.location.reload();
                // }, 3000);
                shouldProceed = false;
              } else {
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.message === "Failed to fetch") {
                appNotifier("Network error, Please try again!");
                shouldProceed = false;
              } else {
                appNotifier("Operation has not been completed!");
              }
            });
        }, 0);


      inputs.forEach((input) => {
        input.value = "";
      });

      selectElements.forEach((selectItems) => {
        selectItems.value = "";
      });
    }
  },
  false
);



function validationForm(input_test) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input_test);
}




const workingNotifier = (message) => {
  new swal({
    title: message,
    text: "",
    icon: "success",
  }).then((result) => {
    if(result.isConfirmed){
      location.reload();
    }
  });
};

function appNotifier(message) {
  new swal({
    title: message,
    text: "",
    icon: "warning",
  });
}
