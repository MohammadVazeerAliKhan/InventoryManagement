function deleteProduct(id){
  let confirmation = confirm('Are you sure you want to delete this Product?')
  if (confirmation){
    fetch('/delete-product/'+id, {
      method: 'POST'
    }).then(res => {
      if(res.ok){
        location.reload()
      }
    } )
  }

}