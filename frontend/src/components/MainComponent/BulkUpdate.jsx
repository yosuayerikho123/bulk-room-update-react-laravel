import { Fragment, useEffect, useRef, useState } from "react";
import { Context as ModalContext } from "../../context/modal/context";
import { v4 as uuidv4 } from "uuid";
import Moment from "moment";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

const roomsName = [
	{
		id: uuidv4(),
		name: "Luxury"
	},
	{
		id: uuidv4(),
		name: "Deluxe"
	},
	{
		id: uuidv4(),
		name: "Standar"
	},
];

function Modal({ rooms, setModal, selectedRooms }) {
	const [amount, setAmount] = useState(0);
	const [applyDays, setApplyDays] = useState([]);

	// handle checked days
	const handleCheck = function(e, day) {
		const checked = e.target.checked;
		const index = applyDays.indexOf(day);
		const days = applyDays;

		// push if not exists
		if (checked && index === -1) {
			days.push(day);
		} else if (!checked && index >= 0) { // splice if exists
			days.splice(index, 1);
		}

		setApplyDays([...days]);
	}

	const update = function() {
		// filter rooms, get the rooms with checked day
		const days = selectedRooms.filter(function(item) {
			const includes = applyDays.includes(item.moment.format('ddd'));

			return includes;
		});

		console.log(days);
	}

	return (
		<Fragment>
			<ModalContext.Consumer>
				{
					value => (
						<div className="fixed flex justify-center items-center top-0 left-0 justify-center h-screen items-center w-screen">
							<div onClick={() => setModal(false)} className="absolute h-screen w-screen top-0 left-0 bg-gray-600 bg-opacity-50">

							</div>
							<div className="bg-white w-3/6 relative z-10 rounded-md">
								<div className="flexbox">
									<h1 className="text-base p-4">Adjust Price</h1>
									<hr/>
									<form action="" className="p-4">
										<div className="mb-4">
											<span className="text-sm block mb-4">
												Apply form date
											</span>
											<div className="border border-gray-200 h-10 flex items-center pl-3 pr-3">
												<span className="inline-block">{ rooms[0].moment.format("DD-MM-YYYY") }</span>
												<span className="font-bold text-lg ml-5 mr-5">&gt;</span>
												<span className="inline-block">{ rooms[1].moment.format("DD-MM-YYYY") }</span>
											</div>
										</div>
										<div className="mb-4">
											<span className="text-sm block mb-4">
												Room Name
											</span>
											<div className="border border-gray-200 h-10 flex items-center pl-3 pr-3">
												<span className="inline-block">{ roomsName[rooms[0].y].name }</span>
											</div>
										</div>
										<div className="flex flex-col mb-4">
											<label className="mb-2 font-bold text-md text-grey-darkest">Amount</label>
											<input onChange={(e) => setAmount(e.target.value)} value={amount} className="border py-2 px-3 text-grey-darkest" type="text"/>
										</div>
										<div>
											<label htmlFor="" className="text-sm">Apply on days</label>
											<div>
												{
													["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item, index) => {
														return (
															<label key={index} className="inline-flex items-center mt-3 mr-3">
																<input onChange={(e) => handleCheck(e, item)} type="checkbox" className="form-checkbox h-5 w-5 text-teal-600"/>
																<span className="ml-2 text-gray-700">{ item }</span>
															</label>
														);
													})
												}
											</div>
										</div>
									</form>
									<hr/>
									<div className="h-12 flex justify-end items-center px-5">
										<button onClick={update} className="bg-blue-500 focus:outline-none active:outline-none hover:bg-blue-700 text-white font-medium text-sm py-1 px-3 rounded outline-none mr-1">
											Save
										</button>
										<button onClick={() => setModal(false)} className="bg-gray-300 focus:outline-none active:outline-none hover:bg-gray-400 text-gray-800 font-medium text-sm py-1 px-3 rounded outline-none">
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</ModalContext.Consumer>
		</Fragment>
	);
}

function BulkUpdate() {

    const [rooms, setRooms] = useState(Array(30));
    const [onHover, setOnHover] = useState(false);
    const [selectedArray, setSelectedArray] = useState([]);
	const [selectedRooms, setSelectedRooms] = useState([]);

    const [dates, setDates] = useState([]);
	const [count, setCount] = useState(30);
	const [date, setDate] = useState(new Date());

	const [modal, setModal] = useState(false);

	const flatpickr = useRef();

	// clear last dates (if there is) and
	// adding new dates, 30 days in first
	const addNewDates = (count = 30, date = null) => {
		let dates = [];
        for (var i = 0; i < count; i++) {
            const moment = (date === null ? Moment() : Moment(date)).add(i, 'days');
            dates.push({
                moment,
                day: moment.format('ddd'),
                date: moment.format('DD'),
                month: moment.format('M')
            });
        }

		setCount(count);
        setDates([...dates]);
	};

	// create rooms based on rooms name
	const createRooms = () => {
		let localRooms = Array(roomsName.length).fill([]);
        localRooms = localRooms.map((item, index) => {
            const row = [];

            for (let i = 0; i < dates.length; i++) {
                row.push({
                    price: (index + 1) * 100,
                    selected: false,
                    x: i, // x and y to give the array position of the room
                    y: index,
					moment: dates[i].moment,
					room_id: roomsName[index].id
                });
            }

            return row;
        });

        setRooms(localRooms);
	};

	const removeSelected = () => {
		setSelectedArray([]);
		clearSelection();
	};

    function handleScroll(event){
		// check if scroll has getting stuck into right
        if (event.target.clientWidth + event.target.scrollLeft === event.target.scrollWidth) {
			addNewDates(count + 10);
        }
		drawSelection();
    }

    useEffect(function() {
        addNewDates();
    }, []);

    useEffect(function() {
		createRooms();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dates]);

    useEffect(function() {
        drawSelection();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedArray]);

    function startSelection(y, x) {

        if (!onHover) {
            let arr = selectedArray;
            arr = [];
            arr.push(rooms[y][x]);
            arr.push(rooms[y][x]);

            setSelectedArray([...arr]);

            setOnHover(true);
        } else {
			setSelectedRooms([...getSelectedRooms()]);
            setOnHover(false);
        }
    }

    function getSelectedRooms() {
        if (selectedArray.length === 0) {
            return [];
        }

        return rooms[selectedArray[0].y].filter(function(item, index) {
            return item.selected;
        });
    }

    function onSelection(y, x) {
        if (onHover) {
            if (selectedArray.length < 2) {
                let arr = selectedArray;
                arr.push(rooms[y][x]);
                setSelectedArray(arr);
            } else {
                if (y === selectedArray[0].y) {
                    selectedArray[1] = rooms[y][x];
                    setSelectedArray(selectedArray);
                }
            }
        }
        drawSelection();
    }

    function clearSelection() {
        const r = [...rooms];

        for (let i = 0; i < r.length; i++) {
            for (var j = 0; j < r[i].length; j++) {
                r[i][j].selected = false;
            }
        }

        setRooms(r);
    }

    function drawSelection() {
        if (selectedArray.length === 2) {
            clearSelection();

            const start = selectedArray[0];
            const end = selectedArray[1];

            const minimum = end.x < start.x ? end.x : start.x;
            const maximum = end.x > start.x ? end.x : start.x;

            const r = [...rooms];

            for (let i = minimum; i <= maximum; i++) {
                r[start.y][i].selected = true;
            }

            setRooms(r);
        }
    }

	function openFlatPickr(e) {
		if (flatpickr.current != null) {
			flatpickr.current.flatpickr.open()
		}
	}

    return (
        <Fragment>
			<div className="flex h-screen justify-center items-center bg-gray-100">
				<div className="box-border border bg-white p-3 w-10/12">
					<div className="top">
						<div onClick={openFlatPickr} className="pr-8 font-medium text-lg flex justify-end h-10 items-center">
							<Flatpickr
								className="font-medium text-lg text-right" 
								data-enable-time
								value={date}
								onChange={date => {
									setDate(date[0]);
									
									let dates = [];
									for (var i = 0; i < 30; i++) {
										const m = Moment(date[0]).add(i, 'days');
										dates.push({
											moment: m,
											day: m.format('ddd'),
											date: m.format('DD'),
											month: m.format('M')
										});
									}
									setDates([...dates]);
									clearSelection();
									drawSelection();
								}}
								options={{altInput: true, enableTime: false, dateFormat: "Y-m-d", altFormat: "F j, Y"}}
							/>
						</div>
						<div className="relative pt-5 pb-5 flex">
							<div className="w-4/12 box-border">
								<div className="h-16">

								</div>
								{
									roomsName.map((item, index) => {
										return (
											<div key={index} className="h-16 flex items-center pl-5">
												{ item.name }
											</div>
										);
									})
								}
							</div>
							<div className="w-8/12 box-border relative overflow-x-scroll" onScroll={handleScroll}>
								<div className="h-16 whitespace-nowrap">
									{
										dates.map(function(item, index){
											return (
												<div key={index} className="border relative inline-block w-16 h-16">
													<div className="flex flex-col h-full w-full justify-center items-center">
														<span className="font-medium">
															{ item.day }
														</span>
														<span className="">
															{ item.date } 
														</span>
													</div>
												</div>
											)
										})
									}
								</div>
								{
									rooms.map(function(item, y) {
										return (
											<div className="h-16 whitespace-nowrap" key={y}>
												{
													item.map(function(item1, x){
														return (
															<div onClick={() => startSelection(y, x)} onMouseOver={() => onSelection(y, x)} key={x} className={"border relative inline-block w-16 h-16" + (item1.selected ? ' bg-blue-200' : '')}>
																<span className="absolute" style={{bottom: "2px", right: "5px"}}>
																	${item1.price}
																</span>
															</div>
														)
													})
												}
											</div>
										)
									})
								}
							</div>
						</div>
						{
							selectedArray.length <= 0 ? null : (
								<Fragment>
									<button onClick={() => setModal(true)} className="mr-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-blue-700 hover:border-blue-500 rounded">
										Update
									</button>
									<button onClick={(e) => removeSelected()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 hover:border-gray-500 rounded">
										Cancel
									</button>
								</Fragment>
							)
						}
						{
							modal && selectedArray.length > 1 ? <Modal selectedRooms={selectedRooms} setModal={setModal} rooms={selectedArray}/> : null
						}
					</div>
				</div>
			</div>
        </Fragment>
    );
}

export default BulkUpdate;
