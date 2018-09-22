//https://kamranahmed.info/toast 

const Notifications = {
    craftWarning() {
        $.toast({
            text: "Free up workers to proceed", // Text that is to be shown in the toast
            heading: 'Insufficient Workers', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#FFF',  // Background color of the toast loader
        });
    },
    slotsFull() {
        $.toast({
            text: "Remove a craft first", // Text that is to be shown in the toast
            heading: 'No Action Slots Available', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#FFF',  // Background color of the toast loader
        });
    },
    workerGoldReq() {
        $.toast({
            text: "More gold required to upgrade", // Text that is to be shown in the toast
            heading: 'Error', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#FFF',  // Background color of the toast loader
        });
    },
    exceptionalCraft(name,type) {
        $.toast({
            text: `You crafted a ${type} ${name}!`, // Text that is to be shown in the toast
            heading: 'Rare Craft!', // Optional heading to be shown on the toast
            icon: 'success', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#FFF',  // Background color of the toast loader
        });
    },
    inventoryFull() {
        $.toast({
            text: "Please sell something to continue", // Text that is to be shown in the toast
            heading: 'Inventory Full', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#9EC600',  // Background color of the toast loader
        });
    },
    alreadyEquipped() {
        $.toast({
            text: "Please unequip what's there to continue", // Text that is to be shown in the toast
            heading: 'Already Equipped', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#9EC600',  // Background color of the toast loader
        });
    },
    moreBluePrints() {
        $.toast({
            text: "Not enough blueprint fragments", // Text that is to be shown in the toast
            heading: 'Cannot Research', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#9EC600',  // Background color of the toast loader
        });       
    }
}