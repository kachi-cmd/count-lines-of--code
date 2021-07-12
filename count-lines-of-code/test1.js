test('shold render properly',()=>{
		
		const {container} = render(<EntityActionEnumParamInput parentState={pState} actionName={SysActions.CREATE} paramName="RunType" paramNullable={false} enumObject={HRPayrollType} />)
		const node1 = container.querySelector('.input-group-prepend')
		expect(node1).toBeInTheDocument();
		expect(node1.textContent).toBe("RunType : ");	
		//validate the values in the select elements are exactly what the listData has
		const node2 = container.querySelector('select')
		//test if node2 i.e the select element is in the html document
		expect(node2).toBeInTheDocument()

		//get the metaData and Data of the listData being used as options
		const enumLength = Object.entries(listData).length;
		const enumValues = Object.values(listData);
		
		//const enumKeys = Object.keys(listData);
		//load the options of the elements of the select field
		const node3 = container.querySelector('option')
		expect(node3).toBeInTheDocument()
		//load in all the options of the select field into the container
		const nodeList = container.querySelectorAll('option')
		
		//test if the length loaded into the UI is same as the length of the values of the ListData
		//enumlength+1 because (none) will be included in the search because the paramNullable is true
		expect(nodeList.length).toBe(enumLength)

		for(let i: number = 0; i < enumLength; i++) {
			expect(`${enumValues[i]}`).toBe(nodeList[i].value);
		}
	})

	test('shold render properly when the paramNullable is True',()=>{
		
		const {container} = render(<EntityActionEnumParamInput parentState={pState} actionName={SysActions.CREATE} paramName="RunType" paramNullable={true} enumObject={HRPayrollType} />)
		
		//get the metaData and Data of the listData being used as options
		const enumLength = Object.entries(listData).length;
		const enumValues = Object.values(listData);
		
		//load the options of the elements of the select field
		const node3 = container.querySelector('option')
		expect(node3).toBeInTheDocument()
		//load in all the options of the select field into the container
		const nodeList = container.querySelectorAll('option')
		
		//test if the length loaded into the UI is same as the length of the values of the ListData
		//enumlength+1 because (none) will be included in the search because the paramNullable is true
		expect(nodeList.length-1).toEqual(enumLength)

		for(let i: number = 0; i < enumLength; i++) {
			expect(`${enumValues[i]}`).toBe(nodeList[i+1].value);
		}
	})
	
})