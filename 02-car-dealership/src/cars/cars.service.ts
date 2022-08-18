import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneByid( id: string ) {
        const car = this.cars.find( car => car.id === id );

        if ( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);

        return car;
    }

    create( createCarDto: CreateCarDto ) {

        const car: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(car);

        return car;
    }

    update ( id: string, updateCarDTO: UpdateCarDto) {

        let carDB = this.findOneByid( id );

        if( updateCarDTO.id && updateCarDTO.id !== id)
            throw new BadRequestException(`Car id is not inside body`);

        this.cars = this.cars.map( car => {
            if( car.id === id ) {
                carDB = {
                    ...carDB,
                    ...updateCarDTO,
                    id,
                }

                return carDB;
            }

            return car;
        })

        return carDB; // carro actualizado
    }

    delete( id: string) {
        const car = this.findOneByid( id );
        this.cars = this.cars.filter( car => car.id !== id );
        return; //undefined
    }
}
