import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
    @tracked queryParams = ['foo'];
    @tracked foo;
}
