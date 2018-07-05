# Application

Wires up the application logic. It implements a concept of pages which are all stored in the similarly named subfolder. The Application and Pages are the only connected components to the redux store.  When cutting up this logic, create the container components in Applicton/containers or Application/pages/*Page/containers based off of if the component is global or page specific.
