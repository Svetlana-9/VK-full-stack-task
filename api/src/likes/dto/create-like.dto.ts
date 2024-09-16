import {
    IsNotEmpty,
    IsOptional,
} from 'class-validator';

export class CreateLikeDto {
    @IsNotEmpty()
    cat_id: string;

    @IsOptional()
    created_at: string;
}
