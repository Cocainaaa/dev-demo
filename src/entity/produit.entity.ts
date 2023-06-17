import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// Définition d'une entité avec la décoration @Entity()
@Entity()
export class Produit {
    // Définition d'une colonne primaire auto-générée avec la décoration @PrimaryGeneratedColumn()
    @PrimaryGeneratedColumn()
    id: string | number 

    // Définition d'une colonne nommée "nomProduit" de type string
    @Column()
    nomProduit: string

    // Définition d'une colonne nommée "nomClient" de type string
    @Column()
    nomClient: string

    // Définition d'une colonne nommée "prix" de type nombre
    @Column()
    prix: number
}
